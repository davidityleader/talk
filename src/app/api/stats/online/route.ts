// GET /api/stats/online - 目前等待 / 配對中人數（首頁顯示用）
import { NextResponse } from "next/server";
import { countWaiting } from "@/lib/matching";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const count = await countWaiting();
    return NextResponse.json({ count });
  } catch {
    return NextResponse.json({ count: 0 });
  }
}
