"use client";

// 暗號分享卡 - 病毒擴散的核心入口
// 使用者一輸入暗號就出現，鼓勵把暗號傳給朋友
import { useMemo } from "react";
import { Copy, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useShare } from "@/hooks/useShare";
import toast from "react-hot-toast";

interface Props {
  passcode: string;
  siteUrl?: string;
}

export function PasscodeShare({ passcode, siteUrl }: Props) {
  const { share, busy } = useShare();

  const url = useMemo(() => {
    if (siteUrl) return siteUrl;
    if (typeof window !== "undefined") return window.location.origin;
    return "https://randate.tw";
  }, [siteUrl]);

  const shareText = useMemo(
    () =>
      `我在「隨意約」等你 ❤️\n暗號：${passcode}\n\n👉 ${url}`,
    [passcode, url]
  );

  if (!passcode || passcode.trim().length < 2) return null;

  const handleShare = () => {
    share({
      title: "隨意約",
      text: shareText,
    });
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shareText);
      toast.success("已複製分享文案");
    } catch {
      toast.error("複製失敗");
    }
  };

  return (
    <div className="mt-3 rounded-xl border border-brand-200 bg-brand-50/60 p-3">
      <div className="flex items-start gap-3">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand-500 text-lg">
          🤝
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-brand-700">
            把暗號傳給朋友，瞬間配對
          </p>
          <p className="mt-0.5 text-xs text-brand-700/70">
            朋友輸入相同暗號 <span className="font-mono font-bold">{passcode}</span>{" "}
            會優先跟你配對
          </p>
        </div>
      </div>
      <div className="mt-3 flex gap-2">
        <Button
          type="button"
          size="sm"
          className="flex-1 rounded-lg"
          onClick={handleShare}
          disabled={busy}
        >
          <Share2 className="h-4 w-4" />
          分享給朋友
        </Button>
        <Button
          type="button"
          size="sm"
          variant="outline"
          className="rounded-lg"
          onClick={handleCopy}
        >
          <Copy className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
