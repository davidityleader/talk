"use client";

// 聊天結束分享卡 - 病毒擴散第二個入口
// 對方離開後出現，顯示對話統計 + 分享按鈕
import { useMemo } from "react";
import { motion } from "framer-motion";
import { Heart, MessageSquare, Clock, Share2, RotateCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useShare } from "@/hooks/useShare";

interface Props {
  durationSec: number;
  messageCount: number;
  scenarios?: string[];
  onNext: () => void;
}

function formatDuration(sec: number) {
  const m = Math.floor(sec / 60);
  const s = sec % 60;
  if (m === 0) return `${s} 秒`;
  return `${m} 分 ${s.toString().padStart(2, "0")} 秒`;
}

export function EndOfChatShare({
  durationSec,
  messageCount,
  scenarios,
  onNext,
}: Props) {
  const { share, busy } = useShare();

  const shareText = useMemo(() => {
    const parts = [
      "我剛在「隨意約」遇到一位有緣人 ❤️",
      `聊了 ${formatDuration(Math.max(durationSec, 0))}，共 ${messageCount} 則訊息`,
      "",
      "也想找個人陪你做點什麼？",
      "👉 https://randate.tw",
    ];
    return parts.join("\n");
  }, [durationSec, messageCount]);

  const handleShare = () => {
    share({ title: "隨意約", text: shareText });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 8, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.3 }}
      className="mt-6 overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-md"
    >
      {/* 漸層 header */}
      <div className="relative flex flex-col items-center gap-2 bg-gradient-to-br from-brand-50 to-brand-100/60 px-5 py-6 text-center">
        <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-brand-500/10" />
        <div className="absolute -left-4 -bottom-4 h-16 w-16 rounded-full bg-brand-500/10" />

        <Heart className="h-7 w-7 text-brand-500 fill-brand-500" />
        <p className="text-sm font-semibold text-brand-800">
          這段聊天結束了
        </p>
        <p className="text-xs text-brand-700/80">
          要不要把這份回憶分享給朋友？
        </p>
      </div>

      {/* 統計 */}
      <div className="grid grid-cols-2 divide-x divide-gray-100 border-t border-gray-100">
        <div className="flex flex-col items-center justify-center gap-1 py-4">
          <Clock className="h-4 w-4 text-gray-400" />
          <span className="text-lg font-bold tabular-nums text-foreground">
            {formatDuration(Math.max(durationSec, 0))}
          </span>
          <span className="text-[11px] text-muted-foreground">聊天時長</span>
        </div>
        <div className="flex flex-col items-center justify-center gap-1 py-4">
          <MessageSquare className="h-4 w-4 text-gray-400" />
          <span className="text-lg font-bold tabular-nums text-foreground">
            {messageCount}
          </span>
          <span className="text-[11px] text-muted-foreground">訊息數</span>
        </div>
      </div>

      {scenarios && scenarios.length > 0 && (
        <div className="border-t border-gray-100 px-5 py-3">
          <p className="text-[11px] text-muted-foreground">聊到的情境</p>
          <div className="mt-1.5 flex flex-wrap gap-1.5">
            {scenarios.slice(0, 6).map((s) => (
              <span
                key={s}
                className="rounded-full bg-brand-50 px-2 py-0.5 text-[11px] font-medium text-brand-700"
              >
                {s}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* CTAs */}
      <div className="grid grid-cols-2 gap-2 border-t border-gray-100 p-3">
        <Button
          type="button"
          variant="outline"
          size="sm"
          className="rounded-lg"
          onClick={handleShare}
          disabled={busy}
        >
          <Share2 className="h-4 w-4" />
          分享
        </Button>
        <Button
          type="button"
          size="sm"
          className="rounded-lg"
          onClick={onNext}
        >
          <RotateCw className="h-4 w-4" />
          找下一個
        </Button>
      </div>
    </motion.div>
  );
}
