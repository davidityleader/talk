"use client";

import { useState, useRef, KeyboardEvent } from "react";
import { Send, Smile } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

const EMOJIS = ["😀", "😂", "😅", "😊", "😍", "🥺", "😭", "😡", "🤔", "👍", "❤️", "🙏", "🎉", "🔥", "✨"];

interface Props {
  disabled?: boolean;
  onSend: (text: string) => Promise<void> | void;
}

export function MessageInput({ disabled, onSend }: Props) {
  const [value, setValue] = useState("");
  const [showEmoji, setShowEmoji] = useState(false);
  const [sending, setSending] = useState(false);
  const textRef = useRef<HTMLTextAreaElement>(null);

  const submit = async () => {
    const text = value.trim();
    if (!text || sending || disabled) return;
    setSending(true);
    try {
      await onSend(text);
      setValue("");
      textRef.current?.focus();
    } finally {
      setSending(false);
    }
  };

  const onKey = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey && !e.nativeEvent.isComposing) {
      e.preventDefault();
      submit();
    }
  };

  return (
    <div className="border-t bg-white px-3 py-2">
      {showEmoji && (
        <div className="mb-2 flex flex-wrap gap-1 rounded-lg border bg-muted/40 p-2">
          {EMOJIS.map((e) => (
            <button
              key={e}
              type="button"
              className="rounded-md p-1 text-xl transition hover:bg-white"
              onClick={() => {
                setValue((v) => v + e);
                textRef.current?.focus();
              }}
            >
              {e}
            </button>
          ))}
        </div>
      )}
      <div className="flex items-end gap-2">
        <Button
          type="button"
          variant="ghost"
          size="icon"
          aria-label="表情符號"
          className={cn(showEmoji && "bg-accent")}
          onClick={() => setShowEmoji((v) => !v)}
          disabled={disabled}
        >
          <Smile className="h-5 w-5" />
        </Button>
        <Textarea
          ref={textRef}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={onKey}
          placeholder={disabled ? "對方已離開..." : "輸入訊息，Enter 送出"}
          rows={1}
          disabled={disabled}
          className="min-h-[40px] max-h-32 flex-1 py-2"
        />
        <Button
          type="button"
          size="icon"
          onClick={submit}
          disabled={!value.trim() || sending || disabled}
          aria-label="送出"
          className="rounded-full"
        >
          <Send className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
