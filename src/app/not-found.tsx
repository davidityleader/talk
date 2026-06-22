import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-white px-6">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-brand-500">404</h1>
        <p className="mt-2 text-muted-foreground">找不到這個頁面</p>
        <Button asChild className="mt-6 rounded-full">
          <Link href="/">回到首頁</Link>
        </Button>
      </div>
    </main>
  );
}
