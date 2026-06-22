import type { Metadata } from "next";
import { WaitingView } from "@/components/waiting/WaitingView";

export const metadata: Metadata = {
  title: "正在尋找有緣人",
  description: "配對中",
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: { index: false, follow: false },
  },
  alternates: { canonical: null },
};

export default function WaitingPage() {
  return <WaitingView />;
}
