# 敲敲看 Knock Chat

> 模仿 [knock.tw](https://knock.tw/) 風格的匿名陌生人配對聊天 MVP。  
> Next.js 15 (App Router) + Prisma + Neon Postgres + Pusher Channels + Tailwind + shadcn/ui。

---

## ✨ 功能

- 匿名 Session（cookie + DB row，不需要註冊）
- 性別 / 偏好 / 話題 / 暗號 多條件配對
- Prisma `Serializable` 交易避免 race condition
- 即時聊天（Pusher Channels 私有頻道）
- 訊息氣泡、表情、Enter 送出
- 對方離開即時通知 + 「找下一個」
- 舉報系統 + 敏感詞過濾
- 響應式設計、繁體中文介面、Framer Motion 動畫

---

## 🧱 技術堆疊

| 類別 | 套件 |
|---|---|
| Framework | Next.js 15 (App Router, RSC) |
| Language | TypeScript |
| Style | Tailwind CSS + shadcn/ui + Radix UI + Lucide |
| ORM | Prisma 6 + `@prisma/adapter-neon` |
| DB | Neon Postgres (`@neondatabase/serverless`) |
| Realtime | Pusher Channels |
| Form | react-hook-form + Zod |
| Animation | Framer Motion |
| Toast | react-hot-toast |

---

## 🚀 本地開發步驟

### 1. 安裝依賴

```bash
npm install
# 或 pnpm install / yarn install
```

### 2. 建立 Neon Postgres

1. 到 [https://neon.tech](https://neon.tech) 註冊並建立一個 project。
2. 在 Dashboard 找到 **Connection string**（建議用 **Pooled connection**），複製。
3. 字串長相類似：  
   `postgresql://USER:PASSWORD@ep-xxxx.ap-southeast-1.aws.neon.tech/neondb?sslmode=require`

### 3. 建立 Pusher Channels App

1. 到 [https://pusher.com](https://pusher.com) → **Channels** → Create app。
2. 選擇最接近的 cluster（台灣建議 `ap3`）。
3. 進入 App → **App Keys**，記下 `app_id`、`key`、`secret`、`cluster`。

### 4. 設定環境變數

```bash
cp .env.example .env
```

接著填入：

```env
DATABASE_URL="postgresql://...neon.tech/neondb?sslmode=require"
PUSHER_APP_ID="xxxxxxx"
PUSHER_SECRET="xxxxxxxxxxxxxxxx"
NEXT_PUBLIC_PUSHER_KEY="xxxxxxxxxxxxxxxx"
NEXT_PUBLIC_PUSHER_CLUSTER="ap3"
```

### 5. 同步資料庫 schema

```bash
npx prisma generate
npx prisma db push
```

> 如果想開 Prisma Studio：`npm run db:studio`

### 6. 啟動 dev server

```bash
npm run dev
```

打開 `http://localhost:3000`，再開一個無痕視窗，兩邊填表單就能互相配對 → 開始聊天。

---

## ☁️ Vercel 部署

1. 把專案推上 GitHub。
2. 在 Vercel 匯入，並設定上述 5 個環境變數。
3. Build command 為 `npm run build`（內含 `prisma generate`）。

> Neon + Pusher 都是 serverless friendly，無需額外設定。

---

## 🗂 專案結構

```
src/
├── app/
│   ├── layout.tsx
│   ├── page.tsx                       # 首頁配對表單
│   ├── waiting/page.tsx               # 等待配對畫面
│   ├── chat/[roomId]/page.tsx         # 聊天室
│   ├── globals.css
│   └── api/
│       ├── match/route.ts             # POST 嘗試配對
│       ├── match/status/route.ts      # GET 等待狀態 (輪詢)
│       ├── match/cancel/route.ts      # POST 取消等待
│       ├── chat/[roomId]/messages/route.ts  # GET/POST 訊息
│       ├── chat/[roomId]/leave/route.ts     # POST 離開
│       ├── pusher/auth/route.ts       # Pusher 私有頻道授權
│       ├── stats/online/route.ts      # 線上人數
│       └── report/route.ts            # 舉報
├── components/
│   ├── home/HomeForm.tsx
│   ├── chat/{ChatRoom,MessageBubble,MessageInput}.tsx
│   └── ui/                            # shadcn-style primitives
├── lib/
│   ├── prisma.ts                      # Neon adapter
│   ├── pusher.ts                      # server + client
│   ├── session.ts                     # cookie 匿名 session
│   ├── matching.ts                    # 配對核心邏輯
│   ├── filter.ts                      # 敏感詞過濾
│   ├── validation.ts                  # Zod schemas
│   └── utils.ts
prisma/schema.prisma                   # Session / ChatRoom / Message / Report
```

---

## 🧠 配對演算法

```
1. 把當前 session 設為 WAITING、寫入偏好
2. 篩出 5 分鐘內 active 的其他 WAITING
3. 若雙方都有相同 passcode → 直接配對
4. 否則：
   - 過濾出「我想要的 + 對方想要的」皆相容
   - 計分：話題重疊 ×10 + 等待時間（封頂 5 分鐘）/30
   - 取最高分配對
5. 全部包在 SERIALIZABLE transaction 中避免雙方互搶
```

---

## 🛡 安全 / 隱私說明

- 訊息經敏感詞過濾後才存 DB，並透過 Pusher 推送。
- Pusher private channel 必須通過 `/api/pusher/auth` 驗證身分。
- Session 只在 cookie 中保存 ID，沒有任何 PII。
- 房間關閉後狀態為 `CLOSED`，仍保留訊息供舉報查證（可依需求清除）。

---

## 🗺 後續可優化

- [ ] 管理後台（檢視舉報、封鎖 session）
- [ ] 視訊 / 語音通話（WebRTC）
- [ ] Rate limit & 黑名單機制
- [ ] 加上正在輸入中（typing indicator）
- [ ] PWA / 推播通知

---

## 📄 License

MIT
# talk
