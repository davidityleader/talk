// 跨平台分享 hook：優先用 Web Share API，沒有就 fallback 到剪貼簿
"use client";

import { useCallback, useState } from "react";
import toast from "react-hot-toast";

export interface ShareInput {
  title?: string;
  text: string;
  url?: string;
}

export function useShare() {
  const [busy, setBusy] = useState(false);

  const share = useCallback(async (input: ShareInput) => {
    setBusy(true);
    const payload = {
      title: input.title,
      text: input.text,
      url: input.url,
    };
    try {
      if (
        typeof navigator !== "undefined" &&
        typeof navigator.share === "function" &&
        navigator.canShare?.(payload as ShareData) !== false
      ) {
        await navigator.share(payload as ShareData);
        return "native" as const;
      }
    } catch (err) {
      // 使用者取消或瀏覽器不支援，落到 clipboard
      if ((err as Error).name === "AbortError") {
        setBusy(false);
        return "cancelled" as const;
      }
    }

    try {
      const fallback = [input.text, input.url].filter(Boolean).join("\n");
      await navigator.clipboard.writeText(fallback);
      toast.success("已複製到剪貼簿，貼到 LINE / IG 即可");
      return "clipboard" as const;
    } catch {
      toast.error("分享失敗，請手動複製");
      return "failed" as const;
    } finally {
      setBusy(false);
    }
  }, []);

  return { share, busy };
}
