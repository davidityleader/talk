// SEO 共用設定 - 站點 URL、預設關鍵字、社群分享資料
// 線上 URL 透過 NEXT_PUBLIC_SITE_URL 注入；未設定時使用 Vercel 預設 URL 或 localhost

function resolveSiteUrl(): string {
  if (process.env.NEXT_PUBLIC_SITE_URL) {
    return process.env.NEXT_PUBLIC_SITE_URL.replace(/\/$/, "");
  }
  // Vercel 部署時會自動注入 VERCEL_PROJECT_PRODUCTION_URL（無 protocol）
  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) {
    return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`;
  }
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }
  return "http://localhost:3000";
}

export const SITE_URL = resolveSiteUrl();

export const SITE_NAME = "約一下";
export const SITE_TITLE = "約一下 - 找個有緣人，匿名聊一下";
export const SITE_DESCRIPTION =
  "約一下是台灣的匿名陌生人即時聊天平台，依性別、話題與暗號隨機配對，找個有緣人聊聊心事與生活。免註冊、不留紀錄、聊得開心就好。";

export const SITE_KEYWORDS = [
  "約一下",
  "匿名聊天",
  "陌生人聊天",
  "隨機配對",
  "免費聊天室",
  "線上聊天",
  "即時聊天",
  "交友聊天",
  "台灣聊天",
  "暗號配對",
  "聊聊天",
  "心情樹洞",
];

export const SITE_LOCALE = "zh_TW";

export const TWITTER_HANDLE = "@yueyixia";
