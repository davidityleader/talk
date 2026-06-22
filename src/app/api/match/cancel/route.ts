// POST /api/match/cancel - 取消等待
import { NextResponse } from "next/server";
import { getCurrentSession } from "@/lib/session";
import { cancelWaiting } from "@/lib/matching";

export const runtime = "nodejs";

export async function POST() {
  const me = await getCurrentSession();
  if (!me) {
    return NextResponse.json({ error: "尚未建立 session" }, { status: 401 });
  }
  await cancelWaiting(me.id);
  return NextResponse.json({ ok: true });
}
