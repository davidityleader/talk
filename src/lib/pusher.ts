// Pusher Channels - 即時聊天訊息推送 (server + client)

import PusherServer from "pusher";
import PusherClient from "pusher-js";

// 房間頻道名稱（私有頻道）
export const roomChannel = (roomId: string) => `private-room-${roomId}`;

// session 頻道（用來通知 matched / leave）
export const sessionChannel = (sessionId: string) =>
  `private-session-${sessionId}`;

// 事件名稱
export const PUSHER_EVENTS = {
  MESSAGE: "message:new",
  MATCHED: "match:found",
  LEFT: "room:left",
  TYPING: "user:typing",
} as const;

let pusherServer: PusherServer | null = null;

export function getPusherServer(): PusherServer {
  if (pusherServer) return pusherServer;
  const {
    PUSHER_APP_ID,
    NEXT_PUBLIC_PUSHER_KEY,
    PUSHER_SECRET,
    NEXT_PUBLIC_PUSHER_CLUSTER,
  } = process.env;

  if (
    !PUSHER_APP_ID ||
    !NEXT_PUBLIC_PUSHER_KEY ||
    !PUSHER_SECRET ||
    !NEXT_PUBLIC_PUSHER_CLUSTER
  ) {
    throw new Error("Pusher 環境變數未完整設定，請參考 .env.example");
  }

  pusherServer = new PusherServer({
    appId: PUSHER_APP_ID,
    key: NEXT_PUBLIC_PUSHER_KEY,
    secret: PUSHER_SECRET,
    cluster: NEXT_PUBLIC_PUSHER_CLUSTER,
    useTLS: true,
  });

  return pusherServer;
}

// client 端使用：必須在瀏覽器初始化
export function createPusherClient() {
  const key = process.env.NEXT_PUBLIC_PUSHER_KEY;
  const cluster = process.env.NEXT_PUBLIC_PUSHER_CLUSTER;
  if (!key || !cluster) {
    throw new Error("NEXT_PUBLIC_PUSHER_KEY / CLUSTER 未設定");
  }
  return new PusherClient(key, {
    cluster,
    authEndpoint: "/api/pusher/auth",
    forceTLS: true,
  });
}
