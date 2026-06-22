// GET /api/match/status - 等待頁面輪詢用，看看自己是否已被配對
import { NextResponse } from "next/server";
import { getCurrentSession } from "@/lib/session";
import { prisma } from "@/lib/prisma";

export const runtime = "nodejs";

export async function GET() {
  const me = await getCurrentSession();
  if (!me) {
    return NextResponse.json({ status: "no_session" }, { status: 401 });
  }

  // 更新 lastActive 避免被當成過期等待者
  await prisma.session.update({
    where: { id: me.id },
    data: { lastActiveAt: new Date() },
  });

  if (me.status === "MATCHED" && me.currentRoomId) {
    return NextResponse.json({
      status: "matched",
      roomId: me.currentRoomId,
    });
  }
  if (me.status === "WAITING") {
    return NextResponse.json({ status: "waiting" });
  }
  return NextResponse.json({ status: me.status.toLowerCase() });
}
