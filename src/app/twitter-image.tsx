// Twitter 分享卡片圖
import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "隨意約 randate.tw - 找個有緣人，一起去做想做的事";
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
          background: "#ffffff",
          fontFamily: "sans-serif",
        }}
      >
        <svg width="200" height="200" viewBox="0 0 64 64" style={{ marginBottom: 24 }}>
          <defs>
            <linearGradient id="tw-grad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#26d27c" />
              <stop offset="60%" stopColor="#06c755" />
              <stop offset="100%" stopColor="#03833a" />
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
            fontSize: 130,
            fontWeight: 900,
            color: "#1f2937",
            letterSpacing: "-0.02em",
            marginBottom: 6,
          }}
        >
          隨意約
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "baseline",
            fontSize: 42,
            fontWeight: 800,
            marginBottom: 16,
          }}
        >
          <span style={{ color: "#1f2937" }}>randate</span>
          <span style={{ color: "#06c755" }}>.tw</span>
        </div>

        <div style={{ fontSize: 30, color: "#4b5563", fontWeight: 500 }}>
          找個有緣人，一起去做想做的事
        </div>
      </div>
    ),
    { ...size }
  );
}
