// Zod schemas - 共用驗證
import { z } from "zod";

export const GenderEnum = z.enum(["MALE", "FEMALE", "UNDISCLOSED"]);
export const PreferGenderEnum = z.enum(["MALE", "FEMALE", "ANY"]);

export const TOPIC_OPTIONS = [
  "純聊",
  "生活",
  "時事娛樂",
  "工作學業",
  "感情",
  "同性",
] as const;

export const matchSchema = z.object({
  gender: GenderEnum,
  preferGender: PreferGenderEnum,
  topics: z
    .array(z.string())
    .max(6, { message: "最多選擇 6 個話題" })
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
