// POST /api/pusher/auth - Pusher private channel 授權
// 僅允許目前 session 訂閱與自己有關的頻道
import { NextResponse } from "next/server";
import { getCurrentSession } from "@/lib/session";
import { getPusherServer, roomChannel, sessionChannel } from "@/lib/pusher";
import { prisma } from "@/lib/prisma";

export const runtime = "nodejs";

export async function POST(req: Request) {
  const me = await getCurrentSession();
  if (!me) {
    return NextResponse.json({ error: "尚未建立 session" }, { status: 401 });
  }

  // pusher-js 會以 form-urlencoded 發送 socket_id + channel_name
  const formData = await req.formData();
  const socketId = String(formData.get("socket_id") ?? "");
  const channelName = String(formData.get("channel_name") ?? "");
  if (!socketId || !channelName) {
    return NextResponse.json({ error: "缺少必要欄位" }, { status: 400 });
  }

  // 自己 session 的頻道
  if (channelName === sessionChannel(me.id)) {
    const pusher = getPusherServer();
    const auth = pusher.authorizeChannel(socketId, channelName);
    return NextResponse.json(auth);
  }

  // 房間頻道：驗證屬於該房間
  const roomMatch = channelName.match(/^private-room-(.+)$/);
  if (roomMatch) {
    const roomId = roomMatch[1];
    if (channelName !== roomChannel(roomId)) {
      return NextResponse.json({ error: "頻道名稱不合法" }, { status: 403 });
    }
    const room = await prisma.chatRoom.findUnique({ where: { id: roomId } });
    if (!room) {
      return NextResponse.json({ error: "房間不存在" }, { status: 404 });
    }
    if (room.sessionAId !== me.id && room.sessionBId !== me.id) {
      return NextResponse.json({ error: "無權限" }, { status: 403 });
    }
    const pusher = getPusherServer();
    const auth = pusher.authorizeChannel(socketId, channelName);
    return NextResponse.json(auth);
  }

  return NextResponse.json({ error: "未授權的頻道" }, { status: 403 });
}
