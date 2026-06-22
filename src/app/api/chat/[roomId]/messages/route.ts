// GET  /api/chat/[roomId]/messages - 取得房間訊息歷史
// POST /api/chat/[roomId]/messages - 送出新訊息（透過 Pusher 推送）
import { NextResponse } from "next/server";
import { getCurrentSession } from "@/lib/session";
import { prisma } from "@/lib/prisma";
import { filterContent } from "@/lib/filter";
import { messageSchema } from "@/lib/validation";
import { getPusherServer, roomChannel, PUSHER_EVENTS } from "@/lib/pusher";

export const runtime = "nodejs";

interface RouteContext {
  params: Promise<{ roomId: string }>;
}

async function authorize(roomId: string) {
  const me = await getCurrentSession();
  if (!me) return { error: "尚未建立 session", status: 401 as const };
  const room = await prisma.chatRoom.findUnique({ where: { id: roomId } });
  if (!room) return { error: "房間不存在", status: 404 as const };
  if (room.sessionAId !== me.id && room.sessionBId !== me.id) {
    return { error: "無權限存取此房間", status: 403 as const };
  }
  return { me, room };
}

export async function GET(_req: Request, { params }: RouteContext) {
  const { roomId } = await params;
  const auth = await authorize(roomId);
  if ("error" in auth) {
    return NextResponse.json({ error: auth.error }, { status: auth.status });
  }
  const messages = await prisma.message.findMany({
    where: { roomId },
    orderBy: { createdAt: "asc" },
    take: 200,
  });
  return NextResponse.json({
    messages,
    room: {
      id: auth.room.id,
      status: auth.room.status,
      meId: auth.me.id,
      partnerId:
        auth.room.sessionAId === auth.me.id
          ? auth.room.sessionBId
          : auth.room.sessionAId,
      createdAt: auth.room.createdAt,
      closedAt: auth.room.closedAt,
    },
  });
}

export async function POST(req: Request, { params }: RouteContext) {
  const { roomId } = await params;
  const auth = await authorize(roomId);
  if ("error" in auth) {
    return NextResponse.json({ error: auth.error }, { status: auth.status });
  }
  if (auth.room.status !== "ACTIVE") {
    return NextResponse.json({ error: "房間已關閉" }, { status: 410 });
  }

  const body = await req.json();
  const parsed = messageSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "訊息內容無效", issues: parsed.error.issues },
      { status: 400 }
    );
  }

  const { filtered } = filterContent(parsed.data.content);

  const message = await prisma.message.create({
    data: {
      roomId,
      senderId: auth.me.id,
      content: filtered,
    },
  });

  await prisma.session.update({
    where: { id: auth.me.id },
    data: { lastActiveAt: new Date() },
  });

  // 推播給房間其他成員
  try {
    const pusher = getPusherServer();
    await pusher.trigger(roomChannel(roomId), PUSHER_EVENTS.MESSAGE, message);
  } catch (e) {
    console.warn("Pusher trigger 失敗:", e);
  }

  return NextResponse.json({ message });
}
