// Randate Logo - 愛心為主體，搭配對話三點暗示聊天
// 文字版「randate.tw」其中「.tw」採用品牌青綠
import { cn } from "@/lib/utils";

interface LogoProps {
  size?: number;
  className?: string;
  variant?: "icon" | "wordmark";
}

export function Logo({ size = 48, className, variant = "icon" }: LogoProps) {
  if (variant === "wordmark") {
    return (
      <div className={cn("inline-flex items-baseline", className)}>
        <span className="text-2xl font-extrabold tracking-tight text-foreground">
          randate
        </span>
        <span className="text-2xl font-extrabold tracking-tight text-brand-500">
          .tw
        </span>
      </div>
    );
  }

  return (
    <div className={cn("inline-flex items-center gap-2", className)}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 64 64"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="隨意約 Randate"
        role="img"
      >
        <defs>
          <linearGradient id="heartGreenGradient" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#26d27c" />
            <stop offset="60%" stopColor="#06c755" />
            <stop offset="100%" stopColor="#03833a" />
          </linearGradient>
          <filter id="heartGreenShadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow
              dx="0"
              dy="2"
              stdDeviation="2.2"
              floodColor="#03833a"
              floodOpacity="0.25"
            />
          </filter>
        </defs>

        {/* 愛心主體 */}
        <path
          d="M32 56s-22-12-22-30C10 16 16 10 24 10c4 0 7 2 8 6 1-4 4-6 8-6 8 0 14 6 14 16 0 18-22 30-22 30z"
          fill="url(#heartGreenGradient)"
          filter="url(#heartGreenShadow)"
        />

        {/* 對話三點：暗示「聊聊」 */}
        <circle cx="23" cy="27" r="2.4" fill="white" />
        <circle cx="32" cy="27" r="2.4" fill="white" />
        <circle cx="41" cy="27" r="2.4" fill="white" />

        {/* 高光 */}
        <ellipse
          cx="22"
          cy="20"
          rx="4"
          ry="2.5"
          fill="white"
          opacity="0.4"
          transform="rotate(-30 22 20)"
        />
      </svg>
    </div>
  );
}
