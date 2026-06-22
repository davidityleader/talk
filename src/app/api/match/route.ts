// POST /api/match - 送出配對偏好，嘗試尋找對象
import { NextResponse } from "next/server";
import { ensureSession } from "@/lib/session";
import { matchSchema } from "@/lib/validation";
import { tryMatch } from "@/lib/matching";

export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    const session = await ensureSession();
    const body = await req.json();
    const parsed = matchSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: "資料格式錯誤", issues: parsed.error.issues },
        { status: 400 }
      );
    }

    const { gender, preferGender, topics, passcode } = parsed.data;

    const result = await tryMatch({
      sessionId: session.id,
      gender,
      preferGender,
      topics,
      passcode: passcode || null,
    });

    return NextResponse.json({
      sessionId: session.id,
      ...result,
    });
  } catch (err) {
    console.error("[/api/match] error:", err);
    return NextResponse.json(
      { error: "配對失敗，請稍後再試" },
      { status: 500 }
    );
  }
}
