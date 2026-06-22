// 約一下 Logo - 以愛心為主體，搭配對話三點暗示聊天
import { cn } from "@/lib/utils";

interface LogoProps {
  size?: number;
  className?: string;
  showText?: boolean;
  textClassName?: string;
}

export function Logo({
  size = 48,
  className,
  showText = false,
  textClassName,
}: LogoProps) {
  return (
    <div className={cn("inline-flex items-center gap-2", className)}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 64 64"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="約一下"
        role="img"
      >
        <defs>
          <linearGradient id="heartGradient" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#fb7185" />
            <stop offset="55%" stopColor="#f43f5e" />
            <stop offset="100%" stopColor="#f97316" />
          </linearGradient>
          <filter id="heartShadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow
              dx="0"
              dy="2"
              stdDeviation="2"
              floodColor="#f43f5e"
              floodOpacity="0.25"
            />
          </filter>
        </defs>

        {/* 主體愛心 */}
        <path
          d="M32 56s-22-12-22-30C10 16 16 10 24 10c4 0 7 2 8 6 1-4 4-6 8-6 8 0 14 6 14 16 0 18-22 30-22 30z"
          fill="url(#heartGradient)"
          filter="url(#heartShadow)"
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

      {showText && (
        <span
          className={cn(
            "bg-gradient-to-r from-rose-500 via-rose-500 to-orange-500 bg-clip-text text-2xl font-extrabold tracking-tight text-transparent",
            textClassName
          )}
        >
          約一下
        </span>
      )}
    </div>
  );
}
