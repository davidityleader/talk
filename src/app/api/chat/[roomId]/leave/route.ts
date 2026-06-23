// POST /api/chat/[roomId]/leave - 離開聊天房間
import { NextResponse } from "next/server";
import { getCurrentSession } from "@/lib/session";
import { prisma } from "@/lib/prisma";
import { getPusherServer, roomChannel, PUSHER_EVENTS } from "@/lib/pusher";

export const runtime = "nodejs";

interface RouteContext {
  params: Promise<{ roomId: string }>;
}

export async function POST(_req: Request, { params }: RouteContext) {
  const { roomId } = await params;
  const me = await getCurrentSession();
  if (!me) {
    return NextResponse.json({ error: "尚未建立 session" }, { status: 401 });
  }
  const room = await prisma.chatRoom.findUnique({ where: { id: roomId } });
  if (!room) {
    return NextResponse.json({ error: "房間不存在" }, { status: 404 });
  }
  if (room.sessionAId !== me.id && room.sessionBId !== me.id) {
    return NextResponse.json({ error: "無權限" }, { status: 403 });
  }

  if (room.status === "ACTIVE") {
    await prisma.$transaction([
      prisma.chatRoom.update({
        where: { id: roomId },
        data: { status: "CLOSED", closedAt: new Date(), closedById: me.id },
      }),
      // 雙方都標記為 LEFT，並把 currentRoomId 搬到 lastRoomId（用於回顧）
      prisma.session.updateMany({
        where: { id: { in: [room.sessionAId, room.sessionBId] } },
        data: {
          status: "LEFT",
          currentRoomId: null,
          lastRoomId: roomId,
        },
      }),
    ]);
  } else {
    // 房間已經關閉了（對方先按離開），仍記下這是我最後一個聊的房間
    await prisma.session.update({
      where: { id: me.id },
      data: { status: "LEFT", currentRoomId: null, lastRoomId: roomId },
    });
  }

  // 通知房間另一方
  try {
    const pusher = getPusherServer();
    await pusher.trigger(roomChannel(roomId), PUSHER_EVENTS.LEFT, {
      byId: me.id,
    });
  } catch (e) {
    console.warn("Pusher trigger 失敗:", e);
  }

  return NextResponse.json({ ok: true });
}
