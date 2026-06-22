// Zod schemas - 共用驗證
import { z } from "zod";

export const GenderEnum = z.enum(["MALE", "FEMALE", "UNDISCLOSED"]);
export const PreferGenderEnum = z.enum(["MALE", "FEMALE", "ANY"]);

// 情境（具體行動，比抽象話題更能驅動真實見面意願）
export const SCENARIO_OPTIONS = [
  { value: "吃飯", emoji: "🍱", label: "一起吃飯" },
  { value: "看夜景", emoji: "🌃", label: "看夜景" },
  { value: "唱KTV", emoji: "🎤", label: "唱 KTV" },
  { value: "吃燒肉", emoji: "🥩", label: "吃燒肉" },
  { value: "看電影", emoji: "🎬", label: "看電影" },
  { value: "喝咖啡", emoji: "☕", label: "喝咖啡" },
  { value: "逛街", emoji: "🛍️", label: "逛街" },
  { value: "運動健身", emoji: "💪", label: "運動健身" },
  { value: "追劇", emoji: "📺", label: "在家追劇" },
  { value: "看展覽", emoji: "🖼️", label: "看展覽" },
  { value: "跨年", emoji: "🎆", label: "一起跨年" },
  { value: "參加婚禮", emoji: "💒", label: "參加婚禮" },
  { value: "回家過年", emoji: "🏮", label: "回家過年" },
  { value: "演唱會", emoji: "🎵", label: "看演唱會" },
  { value: "純聊天", emoji: "💬", label: "純聊天" },
  { value: "樹洞", emoji: "🌳", label: "心情樹洞" },
] as const;

export const SCENARIO_VALUES = SCENARIO_OPTIONS.map((s) => s.value);

export const matchSchema = z.object({
  gender: GenderEnum,
  preferGender: PreferGenderEnum,
  topics: z
    .array(z.string())
    .max(8, { message: "最多選擇 8 個情境" })
    .default([]),
  passcode: z
    .string()
    .trim()
    .max(32, { message: "暗號最多 32 個字" })
    .optional()
    .or(z.literal("")),
});

export type MatchFormValues = z.infer<typeof matchSchema>;

export const messageSchema = z.object({
  content: z
    .string()
    .trim()
    .min(1, { message: "訊息不可為空" })
    .max(500, { message: "訊息最多 500 個字" }),
});

export const reportSchema = z.object({
  roomId: z.string().min(1),
  reason: z.string().min(1).max(100),
  detail: z.string().max(500).optional(),
});
