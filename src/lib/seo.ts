// SEO 共用設定 - 站點 URL、預設關鍵字、社群分享資料

function resolveSiteUrl(): string {
  if (process.env.NEXT_PUBLIC_SITE_URL) {
    return process.env.NEXT_PUBLIC_SITE_URL.replace(/\/$/, "");
  }
  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) {
    return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`;
  }
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }
  return "https://randate.tw";
}

export const SITE_URL = resolveSiteUrl();

export const SITE_NAME = "隨意約";
export const SITE_TITLE = "隨意約 Randate - 找個有緣人，一起去做想做的事";
export const SITE_DESCRIPTION =
  "隨意約 randate.tw 是台灣的匿名情境配對平台。一起吃飯、看夜景、唱 KTV、吃燒肉，甚至找伴一起參加婚禮、回家過年。免註冊、不留紀錄，把生活的缺角補起來。";

export const SITE_KEYWORDS = [
  "隨意約",
  "randate",
  "randate.tw",
  "匿名配對",
  "一起吃飯",
  "找伴聊天",
  "找伴吃飯",
  "找伴看夜景",
  "找伴唱KTV",
  "找伴吃燒肉",
  "找伴參加婚禮",
  "找伴回家過年",
  "陌生人配對",
  "台灣匿名聊天",
  "暗號配對",
  "心情樹洞",
];

export const SITE_LOCALE = "zh_TW";

export const TWITTER_HANDLE = "@randate_tw";
