"use client";

// 一鍵分享到 Threads / X / LINE / 系統原生面板 / 剪貼簿
// 各平台用自家 intent URL，無需 SDK / OAuth

import { Copy, Share2 } from "lucide-react";
import { useShare } from "@/hooks/useShare";
import toast from "react-hot-toast";
import { cn } from "@/lib/utils";

interface Props {
  // 分享主標題（部分平台會用作 og:title fallback）
  title?: string;
  // 主文案（會在 Threads / X 預填到貼文框）
  text: string;
  // 要分享的網址
  url: string;
  // 顯示樣式：full = 大按鈕橫排；compact = 圖示行
  variant?: "full" | "compact";
  className?: string;
}

function threadsIntent(text: string, url: string) {
  return `https://www.threads.net/intent/post?text=${encodeURIComponent(
    `${text}\n${url}`
  )}`;
}

function xIntent(text: string, url: string) {
  return `https://twitter.com/intent/tweet?text=${encodeURIComponent(
    text
  )}&url=${encodeURIComponent(url)}`;
}

function lineIntent(text: string, url: string) {
  return `https://social-plugins.line.me/lineit/share?url=${encodeURIComponent(
    url
  )}&text=${encodeURIComponent(text)}`;
}

// 各家品牌色 - 公開設計事實
const THREADS_BG = "#000000";
const X_BG = "#000000";
const LINE_BG = "#06C755";

function ThreadsGlyph() {
  // 簡化 logo glyph - 圓圈 + 缺口
  return (
    <svg
      viewBox="0 0 24 24"
      width="16"
      height="16"
      fill="currentColor"
      aria-hidden
    >
      <path d="M12.18 22h-.04c-3.13-.02-5.54-1.04-7.16-3.04C3.55 17.18 2.8 14.7 2.78 12.01v-.03c.02-2.69.77-5.17 2.2-6.95C6.6 3.04 9.01 2.02 12.14 2h.04c2.4.02 4.4.6 5.94 1.74 1.45 1.07 2.47 2.6 3.04 4.55l-1.84.55c-.48-1.64-1.27-2.85-2.36-3.65-1.2-.89-2.83-1.35-4.82-1.37-2.61.02-4.58.86-5.84 2.5C5.07 7.95 4.5 9.85 4.48 12c.02 2.15.59 4.04 1.78 5.6 1.26 1.65 3.23 2.49 5.84 2.51 2.36-.02 3.93-.58 5.24-1.86 1.5-1.47 1.47-3.28.99-4.38-.28-.65-.79-1.19-1.49-1.59-.18 1.27-.58 2.3-1.2 3.07-.83 1.04-2 1.6-3.5 1.67-1.13.06-2.22-.22-3.06-.78-1-.66-1.59-1.68-1.67-2.85-.07-1.15.39-2.21 1.29-2.97.86-.73 2.07-1.16 3.5-1.24.55-.03 1.07-.02 1.55.04-.06-.43-.2-.78-.41-1.04-.3-.36-.79-.55-1.45-.56h-.03c-.55 0-1.29.15-1.76.83l-1.5-1.01c.63-.92 1.7-1.43 3.27-1.43h.05c2.65.02 4.22 1.65 4.38 4.48.09.04.19.08.28.13 1.27.6 2.21 1.51 2.71 2.65.71 1.59.78 4.17-1.32 6.25C16.65 21.24 14.7 22 12.18 22zm.93-7.8c-.18 0-.36.005-.55.015-1.79.1-2.9.93-2.84 2.05.06 1.18 1.36 1.73 2.61 1.67 1.15-.05 2.6-.5 2.84-3.45-.65-.14-1.34-.21-2.06-.21z" />
    </svg>
  );
}

function XGlyph() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="14"
      height="14"
      fill="currentColor"
      aria-hidden
    >
      <path d="M18.244 2H21l-6.52 7.46L22 22h-6.81l-4.77-6.24L4.8 22H2l7.03-8.03L2 2h6.94l4.32 5.7L18.244 2zm-2.39 18h2.07L6.24 4H4.1l11.755 16z" />
    </svg>
  );
}

function LineGlyph() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="16"
      height="16"
      fill="currentColor"
      aria-hidden
    >
      <path d="M12 2C6.48 2 2 5.66 2 10.18c0 4.05 3.59 7.45 8.43 8.09.33.07.78.22.89.5.1.26.07.66.03.92l-.14.86c-.04.26-.21 1 .88.55 1.09-.46 5.86-3.45 8-5.91 1.48-1.62 2.19-3.26 2.19-5.01C22 5.66 17.52 2 12 2z" />
    </svg>
  );
}

export function SocialShareButtons({
  title,
  text,
  url,
  variant = "full",
  className,
}: Props) {
  const { share } = useShare();

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(`${text}\n${url}`);
      toast.success("已複製分享文案");
    } catch {
      toast.error("複製失敗");
    }
  };

  if (variant === "compact") {
    return (
      <div className={cn("flex items-center gap-2", className)}>
        <a
          href={threadsIntent(text, url)}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="分享到 Threads"
          className="flex h-9 w-9 items-center justify-center rounded-full text-white transition hover:opacity-90"
          style={{ backgroundColor: THREADS_BG }}
        >
          <ThreadsGlyph />
        </a>
        <a
          href={xIntent(text, url)}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="分享到 X"
          className="flex h-9 w-9 items-center justify-center rounded-full text-white transition hover:opacity-90"
          style={{ backgroundColor: X_BG }}
        >
          <XGlyph />
        </a>
        <a
          href={lineIntent(text, url)}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="分享到 LINE"
          className="flex h-9 w-9 items-center justify-center rounded-full text-white transition hover:opacity-90"
          style={{ backgroundColor: LINE_BG }}
        >
          <LineGlyph />
        </a>
        <button
          type="button"
          onClick={handleCopy}
          aria-label="複製"
          className="flex h-9 w-9 items-center justify-center rounded-full border border-gray-300 bg-white text-gray-600 transition hover:bg-gray-50"
        >
          <Copy className="h-4 w-4" />
        </button>
        <button
          type="button"
          onClick={() => share({ title, text, url })}
          aria-label="其他"
          className="flex h-9 w-9 items-center justify-center rounded-full border border-gray-300 bg-white text-gray-600 transition hover:bg-gray-50"
        >
          <Share2 className="h-4 w-4" />
        </button>
      </div>
    );
  }

  // full 版本：標籤 + icon
  return (
    <div className={cn("grid grid-cols-2 gap-2 sm:grid-cols-4", className)}>
      <a
        href={threadsIntent(text, url)}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold text-white transition hover:opacity-90"
        style={{ backgroundColor: THREADS_BG }}
      >
        <ThreadsGlyph />
        Threads
      </a>
      <a
        href={xIntent(text, url)}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold text-white transition hover:opacity-90"
        style={{ backgroundColor: X_BG }}
      >
        <XGlyph />X
      </a>
      <a
        href={lineIntent(text, url)}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold text-white transition hover:opacity-90"
        style={{ backgroundColor: LINE_BG }}
      >
        <LineGlyph />
        LINE
      </a>
      <button
        type="button"
        onClick={handleCopy}
        className="flex items-center justify-center gap-2 rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm font-semibold text-gray-700 transition hover:bg-gray-50"
      >
        <Copy className="h-4 w-4" />
        複製
      </button>
    </div>
  );
}
