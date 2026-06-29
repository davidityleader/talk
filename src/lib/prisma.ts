// Prisma client with Neon serverless driver adapter
// 透過 Neon 的 HTTP/WebSocket 連線，可在 serverless / edge 環境下穩定運作。
// 使用 lazy proxy 避免 build 階段就嘗試讀 DATABASE_URL

import { neonConfig } from "@neondatabase/serverless";
import { PrismaNeon } from "@prisma/adapter-neon";
import { PrismaClient } from "@prisma/client";
import ws from "ws";

if (typeof WebSocket === "undefined") {
  neonConfig.webSocketConstructor = ws;
}

declare global {
  // eslint-disable-next-line no-var
  var __prisma: PrismaClient | undefined;
}

function createPrisma(): PrismaClient {
  // 優先使用 NEON_DATABASE_URL（避開 Vercel × Neon 整合的自動覆寫）
  // 回退順序：NEON_DATABASE_URL → POSTGRES_PRISMA_URL → DATABASE_URL
  const connectionString =
    process.env.NEON_DATABASE_URL ||
    process.env.POSTGRES_PRISMA_URL ||
    process.env.DATABASE_URL;
  if (!connectionString) {
    throw new Error(
      "NEON_DATABASE_URL / POSTGRES_PRISMA_URL / DATABASE_URL 三者皆未設定"
    );
  }
  const adapter = new PrismaNeon({ connectionString });
  return new PrismaClient({ adapter });
}

function getPrisma(): PrismaClient {
  if (!global.__prisma) {
    global.__prisma = createPrisma();
  }
  return global.__prisma;
}

// 對外導出的 prisma 物件透過 Proxy 延遲初始化
export const prisma = new Proxy({} as PrismaClient, {
  get(_target, prop) {
    const client = getPrisma();
    const value = Reflect.get(client, prop, client);
    return typeof value === "function" ? value.bind(client) : value;
  },
});
