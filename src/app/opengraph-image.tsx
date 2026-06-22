// 動態產生 1200x630 的 Open Graph 分享圖
// 任何分享到 Facebook / LINE / Twitter / Discord 都會用這張
import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "約一下 - 找個有緣人，匿名聊一下";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background:
            "linear-gradient(135deg, #ffedd5 0%, #ffe4e6 50%, #fef3c7 100%)",
          fontFamily: "sans-serif",
          position: "relative",
        }}
      >
        {/* 裝飾光點 */}
        <div
          style={{
            position: "absolute",
            top: 80,
            left: 100,
            width: 120,
            height: 120,
            background:
              "radial-gradient(circle, rgba(251,113,133,0.35) 0%, transparent 70%)",
            borderRadius: 9999,
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: 100,
            right: 120,
            width: 180,
            height: 180,
            background:
              "radial-gradient(circle, rgba(249,115,22,0.3) 0%, transparent 70%)",
            borderRadius: 9999,
          }}
        />

        {/* 愛心 Logo */}
        <svg
          width="220"
          height="220"
          viewBox="0 0 64 64"
          style={{ marginBottom: 30 }}
        >
          <defs>
            <linearGradient id="og-grad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#fb7185" />
              <stop offset="55%" stopColor="#f43f5e" />
              <stop offset="100%" stopColor="#f97316" />
            </linearGradient>
          </defs>
          <path
            d="M32 56s-22-12-22-30C10 16 16 10 24 10c4 0 7 2 8 6 1-4 4-6 8-6 8 0 14 6 14 16 0 18-22 30-22 30z"
            fill="url(#og-grad)"
          />
          <circle cx="23" cy="27" r="2.4" fill="white" />
          <circle cx="32" cy="27" r="2.4" fill="white" />
          <circle cx="41" cy="27" r="2.4" fill="white" />
        </svg>

        {/* 標題 */}
        <div
          style={{
            fontSize: 140,
            fontWeight: 900,
            background: "linear-gradient(90deg, #f43f5e 0%, #f97316 100%)",
            backgroundClip: "text",
            color: "transparent",
            letterSpacing: "-0.02em",
            marginBottom: 10,
          }}
        >
          約一下
        </div>

        {/* 標語 */}
        <div
          style={{
            fontSize: 36,
            color: "#78350f",
            fontWeight: 500,
            letterSpacing: "0.02em",
          }}
        >
          找個有緣人，輕鬆聊一下
        </div>

        {/* 副標 */}
        <div
          style={{
            marginTop: 24,
            display: "flex",
            gap: 24,
            fontSize: 22,
            color: "#9f1239",
            opacity: 0.85,
          }}
        >
          <span>· 匿名</span>
          <span>· 即時</span>
          <span>· 免註冊</span>
        </div>
      </div>
    ),
    { ...size }
  );
}
