// Twitter 分享卡片圖（與 OG 邏輯共用）
import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "約一下 - 找個有緣人，匿名聊一下";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function TwitterImage() {
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
        }}
      >
        <svg width="220" height="220" viewBox="0 0 64 64" style={{ marginBottom: 30 }}>
          <defs>
            <linearGradient id="tw-grad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#fb7185" />
              <stop offset="55%" stopColor="#f43f5e" />
              <stop offset="100%" stopColor="#f97316" />
            </linearGradient>
          </defs>
          <path
            d="M32 56s-22-12-22-30C10 16 16 10 24 10c4 0 7 2 8 6 1-4 4-6 8-6 8 0 14 6 14 16 0 18-22 30-22 30z"
            fill="url(#tw-grad)"
          />
          <circle cx="23" cy="27" r="2.4" fill="white" />
          <circle cx="32" cy="27" r="2.4" fill="white" />
          <circle cx="41" cy="27" r="2.4" fill="white" />
        </svg>
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
        <div style={{ fontSize: 36, color: "#78350f", fontWeight: 500 }}>
          找個有緣人，輕鬆聊一下
        </div>
      </div>
    ),
    { ...size }
  );
}
