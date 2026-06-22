// 動態產生 1200x630 的 Open Graph 分享圖
import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "隨意約 randate.tw - 找個有緣人，一起去做想做的事";
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
          background: "#ffffff",
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
            width: 140,
            height: 140,
            background:
              "radial-gradient(circle, rgba(6,199,85,0.18) 0%, transparent 70%)",
            borderRadius: 9999,
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: 100,
            right: 120,
            width: 200,
            height: 200,
            background:
              "radial-gradient(circle, rgba(38,210,124,0.18) 0%, transparent 70%)",
            borderRadius: 9999,
          }}
        />

        {/* 愛心 Logo */}
        <svg
          width="200"
          height="200"
          viewBox="0 0 64 64"
          style={{ marginBottom: 24 }}
        >
          <defs>
            <linearGradient id="og-grad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#26d27c" />
              <stop offset="60%" stopColor="#06c755" />
              <stop offset="100%" stopColor="#03833a" />
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

        {/* 主標題 */}
        <div
          style={{
            fontSize: 130,
            fontWeight: 900,
            color: "#1f2937",
            letterSpacing: "-0.02em",
            marginBottom: 6,
          }}
        >
          隨意約
        </div>

        {/* 網址 */}
        <div
          style={{
            display: "flex",
            alignItems: "baseline",
            fontSize: 42,
            fontWeight: 800,
            marginBottom: 18,
          }}
        >
          <span style={{ color: "#1f2937" }}>randate</span>
          <span style={{ color: "#06c755" }}>.tw</span>
        </div>

        {/* 標語 */}
        <div
          style={{
            fontSize: 30,
            color: "#4b5563",
            fontWeight: 500,
            letterSpacing: "0.02em",
          }}
        >
          找個有緣人，一起去做想做的事
        </div>

        {/* 情境徽章 */}
        <div
          style={{
            marginTop: 26,
            display: "flex",
            gap: 14,
            fontSize: 22,
            color: "#03833a",
          }}
        >
          <span
            style={{
              background: "#e6faf0",
              padding: "8px 16px",
              borderRadius: 999,
            }}
          >
            🍱 一起吃飯
          </span>
          <span
            style={{
              background: "#e6faf0",
              padding: "8px 16px",
              borderRadius: 999,
            }}
          >
            🌃 看夜景
          </span>
          <span
            style={{
              background: "#e6faf0",
              padding: "8px 16px",
              borderRadius: 999,
            }}
          >
            🎤 唱 KTV
          </span>
          <span
            style={{
              background: "#e6faf0",
              padding: "8px 16px",
              borderRadius: 999,
            }}
          >
            🏮 回家過年
          </span>
        </div>
      </div>
    ),
    { ...size }
  );
}
