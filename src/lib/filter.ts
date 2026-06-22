// 簡單的敏感詞過濾
// 此清單僅為示範，正式環境請依需求擴充或改用第三方審核服務

const BLOCKED_WORDS = [
  "幹你娘",
  "操你媽",
  "賤人",
  "死全家",
  "去死",
  "白癡",
  "智障",
  "fuck",
  "shit",
  "bitch",
];

/**
 * 將訊息中的敏感詞替換成 *。
 * 同時回傳是否包含敏感詞（可用於記錄）。
 */
export function filterContent(input: string): {
  filtered: string;
  hit: boolean;
} {
  let hit = false;
  let result = input;
  for (const w of BLOCKED_WORDS) {
    const re = new RegExp(w, "gi");
    if (re.test(result)) {
      hit = true;
      result = result.replace(re, "*".repeat(w.length));
    }
  }
  return { filtered: result, hit };
}
