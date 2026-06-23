// 「回到上次的對話」橫幅
// 出現條件：使用者上次離開房間 24 小時內、房間還存在
import Link from "next/link";
import { ArrowRight, History } from "lucide-react";

interface Props {
  roomId: string;
  closedAt: Date | null;
}

function relativeTime(date: Date | null): string {
  if (!date) return "剛剛";
  const diff = Date.now() - new Date(date).getTime();
  const mins = Math.floor(diff / 60_000);
  if (mins < 1) return "剛剛";
  if (mins < 60) return `${mins} 分鐘前`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs} 小時前`;
  return `${Math.floor(hrs / 24)} 天前`;
}

export function ReturnBanner({ roomId, closedAt }: Props) {
  return (
    <Link
      href={`/chat/${roomId}`}
      className="group mb-4 flex items-center gap-3 rounded-xl border border-brand-200 bg-brand-50 px-4 py-3 transition hover:border-brand-400 hover:bg-brand-100/60"
    >
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand-500 text-white">
        <History className="h-4 w-4" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-brand-800">
          回到上次的對話
        </p>
        <p className="text-xs text-brand-700/80">
          結束於 {relativeTime(closedAt)} · 點此查看訊息回顧
        </p>
      </div>
      <ArrowRight className="h-4 w-4 shrink-0 text-brand-600 transition group-hover:translate-x-0.5" />
    </Link>
  );
}
