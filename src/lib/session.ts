// Session 管理 - 透過 HTTP-only cookie 紀錄 sessionId
// 因為是匿名服務，每位訪客一個 session row

import { cookies } from "next/headers";
import { prisma } from "./prisma";
import type { Session } from "@prisma/client";

const SESSION_COOKIE = "knock_sid";
const MAX_AGE_SECONDS = 60 * 60 * 24 * 30; // 30 天

export async function getSessionId(): Promise<string | null> {
  const c = await cookies();
  return c.get(SESSION_COOKIE)?.value ?? null;
}

export async function setSessionCookie(sessionId: string) {
  const c = await cookies();
  c.set(SESSION_COOKIE, sessionId, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: MAX_AGE_SECONDS,
  });
}

export async function clearSessionCookie() {
  const c = await cookies();
  c.delete(SESSION_COOKIE);
}

// 取得目前的 session 物件（不存在則回 null）
export async function getCurrentSession(): Promise<Session | null> {
  const sid = await getSessionId();
  if (!sid) return null;
  return prisma.session.findUnique({ where: { id: sid } });
}

// 取得或建立 session（首次造訪時建立）
export async function ensureSession(): Promise<Session> {
  const sid = await getSessionId();
  if (sid) {
    const s = await prisma.session.findUnique({ where: { id: sid } });
    if (s) {
      await prisma.session.update({
        where: { id: s.id },
        data: { lastActiveAt: new Date() },
      });
      return s;
    }
  }
  const created = await prisma.session.create({ data: {} });
  await setSessionCookie(created.id);
  return created;
}
