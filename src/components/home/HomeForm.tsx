"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { Loader2, Sparkles, Users } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import {
  matchSchema,
  TOPIC_OPTIONS,
  type MatchFormValues,
} from "@/lib/validation";

export function HomeForm() {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [onlineCount, setOnlineCount] = useState<number | null>(null);

  const {
    control,
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<MatchFormValues>({
    resolver: zodResolver(matchSchema),
    defaultValues: {
      gender: "UNDISCLOSED",
      preferGender: "ANY",
      topics: [],
      passcode: "",
    },
  });

  useEffect(() => {
    let cancelled = false;
    const fetchOnline = async () => {
      try {
        const res = await fetch("/api/stats/online", { cache: "no-store" });
        const data = await res.json();
        if (!cancelled) setOnlineCount(data.count ?? 0);
      } catch {
        if (!cancelled) setOnlineCount(0);
      }
    };
    fetchOnline();
    const id = setInterval(fetchOnline, 8000);
    return () => {
      cancelled = true;
      clearInterval(id);
    };
  }, []);

  const onSubmit = handleSubmit(async (values) => {
    setSubmitting(true);
    try {
      const res = await fetch("/api/match", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      if (!res.ok) {
        const e = await res.json().catch(() => ({}));
        toast.error(e.error ?? "配對失敗，請稍後再試");
        setSubmitting(false);
        return;
      }
      const data = await res.json();
      if (data.status === "matched" && data.roomId) {
        toast.success("配對成功！正在進入聊天室");
        router.push(`/chat/${data.roomId}`);
      } else {
        router.push("/waiting");
      }
    } catch {
      toast.error("發生未預期錯誤");
      setSubmitting(false);
    }
  });

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <Card>
          <CardContent className="space-y-6 pt-6">
            {/* 我的性別 */}
            <div className="space-y-3">
              <Label className="text-base">你的性別</Label>
              <Controller
                control={control}
                name="gender"
                render={({ field }) => (
                  <RadioGroup
                    value={field.value}
                    onValueChange={field.onChange}
                    className="grid grid-cols-3 gap-3"
                  >
                    {[
                      { value: "MALE", label: "男" },
                      { value: "FEMALE", label: "女" },
                      { value: "UNDISCLOSED", label: "不公開" },
                    ].map((o) => (
                      <Label
                        key={o.value}
                        htmlFor={`gender-${o.value}`}
                        className={cn(
                          "flex cursor-pointer items-center justify-center gap-2 rounded-xl border bg-background py-3 text-sm transition hover:border-primary/60",
                          "[&:has([data-state=checked])]:border-primary [&:has([data-state=checked])]:bg-primary/10 [&:has([data-state=checked])]:text-primary"
                        )}
                      >
                        <RadioGroupItem
                          id={`gender-${o.value}`}
                          value={o.value}
                          className="sr-only"
                        />
                        {o.label}
                      </Label>
                    ))}
                  </RadioGroup>
                )}
              />
            </div>

            {/* 想找對象 */}
            <div className="space-y-3">
              <Label className="text-base">想找的對象</Label>
              <Controller
                control={control}
                name="preferGender"
                render={({ field }) => (
                  <RadioGroup
                    value={field.value}
                    onValueChange={field.onChange}
                    className="grid grid-cols-3 gap-3"
                  >
                    {[
                      { value: "MALE", label: "男性" },
                      { value: "FEMALE", label: "女性" },
                      { value: "ANY", label: "不限" },
                    ].map((o) => (
                      <Label
                        key={o.value}
                        htmlFor={`prefer-${o.value}`}
                        className={cn(
                          "flex cursor-pointer items-center justify-center gap-2 rounded-xl border bg-background py-3 text-sm transition hover:border-primary/60",
                          "[&:has([data-state=checked])]:border-primary [&:has([data-state=checked])]:bg-primary/10 [&:has([data-state=checked])]:text-primary"
                        )}
                      >
                        <RadioGroupItem
                          id={`prefer-${o.value}`}
                          value={o.value}
                          className="sr-only"
                        />
                        {o.label}
                      </Label>
                    ))}
                  </RadioGroup>
                )}
              />
            </div>

            {/* 話題 */}
            <div className="space-y-3">
              <Label className="text-base">想聊的話題（可複選）</Label>
              <Controller
                control={control}
                name="topics"
                render={({ field }) => (
                  <div className="flex flex-wrap gap-2">
                    {TOPIC_OPTIONS.map((topic) => {
                      const selected = field.value?.includes(topic);
                      return (
                        <button
                          type="button"
                          key={topic}
                          onClick={() => {
                            const next = selected
                              ? field.value.filter((t) => t !== topic)
                              : [...(field.value ?? []), topic];
                            field.onChange(next);
                          }}
                          className={cn(
                            "flex items-center gap-1.5 rounded-full border px-4 py-1.5 text-sm transition",
                            selected
                              ? "border-primary bg-primary text-primary-foreground"
                              : "border-border bg-background hover:border-primary/60"
                          )}
                        >
                          {selected && <Checkbox checked className="h-3 w-3 pointer-events-none" />}
                          {topic}
                        </button>
                      );
                    })}
                  </div>
                )}
              />
              {errors.topics && (
                <p className="text-sm text-destructive">
                  {errors.topics.message as string}
                </p>
              )}
            </div>

            {/* 暗號 */}
            <div className="space-y-2">
              <Label htmlFor="passcode" className="text-base">
                暗號（選填）
              </Label>
              <Input
                id="passcode"
                placeholder="與朋友約好的暗號 - 相同暗號優先配對"
                {...register("passcode")}
              />
              {errors.passcode && (
                <p className="text-sm text-destructive">
                  {errors.passcode.message}
                </p>
              )}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <Button
        type="submit"
        size="xl"
        className="w-full rounded-2xl text-base font-semibold shadow-md"
        disabled={submitting}
      >
        {submitting ? (
          <>
            <Loader2 className="h-5 w-5 animate-spin" />
            配對中...
          </>
        ) : (
          <>
            <Sparkles className="h-5 w-5" />
            開始聊天
          </>
        )}
      </Button>

      <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
        <Users className="h-4 w-4" />
        目前有{" "}
        <span className="font-semibold text-foreground">
          {onlineCount ?? "..."}
        </span>{" "}
        人正在等待配對
      </div>
    </form>
  );
}
