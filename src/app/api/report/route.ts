// POST /api/report - 對某個房間 / 對方提交舉報
import { NextResponse } from "next/server";
import { getCurrentSession } from "@/lib/session";
import { prisma } from "@/lib/prisma";
import { reportSchema } from "@/lib/validation";

export const runtime = "nodejs";

export async function POST(req: Request) {
  const me = await getCurrentSession();
  if (!me) {
    return NextResponse.json({ error: "尚未建立 session" }, { status: 401 });
  }
  const body = await req.json();
  const parsed = reportSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "資料格式錯誤", issues: parsed.error.issues },
      { status: 400 }
    );
  }
  const { roomId, reason, detail } = parsed.data;

  const room = await prisma.chatRoom.findUnique({ where: { id: roomId } });
  if (!room) {
    return NextResponse.json({ error: "房間不存在" }, { status: 404 });
  }
  if (room.sessionAId !== me.id && room.sessionBId !== me.id) {
    return NextResponse.json({ error: "無權限" }, { status: 403 });
  }
  const partnerId =
    room.sessionAId === me.id ? room.sessionBId : room.sessionAId;

  await prisma.report.create({
    data: {
      roomId,
      reporterId: me.id,
      reportedId: partnerId,
      reason,
      detail: detail ?? null,
    },
  });
  return NextResponse.json({ ok: true });
}
