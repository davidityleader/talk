// 配對核心邏輯
// 規則:
//   1. 相同 passcode 的人 (兩邊都有填且相同) → 最優先
//   2. 性別偏好需互相符合 (我想要的對方性別 + 對方想要的我的性別)
//   3. 話題重疊數量越多越優先
//   4. 等待時間越久越優先 (避免飢餓)

import { Prisma } from "@prisma/client";
import type { Gender, PreferGender, Session } from "@prisma/client";
import { prisma } from "./prisma";
import { getPusherServer, PUSHER_EVENTS, sessionChannel } from "./pusher";

export interface MatchInput {
  sessionId: string;
  gender: Gender;
  preferGender: PreferGender;
  topics: string[];
  passcode?: string | null;
}

export interface MatchResult {
  status: "matched" | "waiting";
  roomId?: string;
  partnerId?: string;
}

// 過濾出與我互相符合性別偏好的候選人
function genderCompatible(me: Session, other: Session): boolean {
  const myWantOk =
    me.preferGender === "ANY" ||
    (me.preferGender === "MALE" && other.gender === "MALE") ||
    (me.preferGender === "FEMALE" && other.gender === "FEMALE");

  const theirWantOk =
    other.preferGender === "ANY" ||
    (other.preferGender === "MALE" && me.gender === "MALE") ||
    (other.preferGender === "FEMALE" && me.gender === "FEMALE");

  return myWantOk && theirWantOk;
}

function scoreCandidate(me: Session, other: Session): number {
  // 話題重疊數
  const overlap = me.topics.filter((t) => other.topics.includes(t)).length;
  // 等待時間 (秒) - 越久得分越高
  const waited = (Date.now() - new Date(other.lastActiveAt).getTime()) / 1000;
  return overlap * 10 + Math.min(waited, 300) / 30;
}

/**
 * 嘗試替指定的 session 進行配對。
 * 使用 SERIALIZABLE 交易避免 race condition。
 */
export async function tryMatch(input: MatchInput): Promise<MatchResult> {
  return prisma.$transaction(
    async (tx) => {
      // 更新或寫入我的偏好 + 設為 WAITING
      const me = await tx.session.update({
        where: { id: input.sessionId },
        data: {
          gender: input.gender,
          preferGender: input.preferGender,
          topics: input.topics,
          passcode: input.passcode ?? null,
          status: "WAITING",
          lastActiveAt: new Date(),
          currentRoomId: null,
        },
      });

      // 5 分鐘內 active 的等待者作為候選池
      const fiveMinsAgo = new Date(Date.now() - 5 * 60 * 1000);

      // 優先比對暗號
      if (me.passcode) {
        const passcodeMatch = await tx.session.findFirst({
          where: {
            id: { not: me.id },
            status: "WAITING",
            passcode: me.passcode,
            lastActiveAt: { gte: fiveMinsAgo },
          },
          orderBy: { lastActiveAt: "asc" },
        });
        if (passcodeMatch) {
          return await createRoomAndNotify(tx, me, passcodeMatch);
        }
      }

      // 取出所有等待中的候選人
      const candidates = await tx.session.findMany({
        where: {
          id: { not: me.id },
          status: "WAITING",
          lastActiveAt: { gte: fiveMinsAgo },
        },
        orderBy: { lastActiveAt: "asc" },
        take: 50,
      });

      const compatible = candidates.filter((c) => genderCompatible(me, c));
      if (compatible.length === 0) {
        return { status: "waiting" as const };
      }

      // 取最高分
      const sorted = [...compatible].sort(
        (a, b) => scoreCandidate(me, b) - scoreCandidate(me, a)
      );
      const partner = sorted[0];

      return await createRoomAndNotify(tx, me, partner);
    },
    {
      isolationLevel: Prisma.TransactionIsolationLevel.Serializable,
      timeout: 10_000,
    }
  );
}

async function createRoomAndNotify(
  tx: Prisma.TransactionClient,
  me: Session,
  partner: Session
): Promise<MatchResult> {
  // 確認對方還在 WAITING（serializable 下應該成立，仍再讀一次保險）
  const fresh = await tx.session.findUnique({ where: { id: partner.id } });
  if (!fresh || fresh.status !== "WAITING") {
    return { status: "waiting" };
  }

  const room = await tx.chatRoom.create({
    data: {
      sessionAId: me.id,
      sessionBId: partner.id,
    },
  });

  await tx.session.update({
    where: { id: me.id },
    data: { status: "MATCHED", currentRoomId: room.id },
  });
  await tx.session.update({
    where: { id: partner.id },
    data: { status: "MATCHED", currentRoomId: room.id },
  });

  // 通知對方（我這邊由 API 回應直接告知）
  // 此處在 transaction 完成後 fire-and-forget
  notifyMatch(partner.id, room.id, me.id).catch(() => {
    /* 忽略推播失敗 */
  });

  return {
    status: "matched",
    roomId: room.id,
    partnerId: partner.id,
  };
}

async function notifyMatch(toSessionId: string, roomId: string, fromId: string) {
  try {
    const pusher = getPusherServer();
    await pusher.trigger(sessionChannel(toSessionId), PUSHER_EVENTS.MATCHED, {
      roomId,
      partnerId: fromId,
    });
  } catch {
    // pusher 未設定時不應阻斷流程
  }
}

/**
 * 取消等待
 */
export async function cancelWaiting(sessionId: string) {
  await prisma.session.update({
    where: { id: sessionId },
    data: { status: "IDLE", lastActiveAt: new Date() },
  });
}

/**
 * 計算目前等待中的人數（5 分鐘內 active）
 */
export async function countWaiting(): Promise<number> {
  const fiveMinsAgo = new Date(Date.now() - 5 * 60 * 1000);
  return prisma.session.count({
    where: {
      status: { in: ["WAITING", "MATCHED"] },
      lastActiveAt: { gte: fiveMinsAgo },
    },
  });
}
