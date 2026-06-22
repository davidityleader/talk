import type { Metadata, Viewport } from "next";
import { Toaster } from "react-hot-toast";
import "./globals.css";

export const metadata: Metadata = {
  title: "敲敲看 Knock Chat - 匿名陌生人聊天",
  description: "讓我們來找個人陪你聊聊天 - 隨機配對、匿名安心、即時聊天。",
  keywords: ["匿名聊天", "陌生人聊天", "隨機配對", "Knock"],
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: "#f97316",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-TW" suppressHydrationWarning>
      <body className="font-sans">
        {children}
        <Toaster
          position="top-center"
          toastOptions={{
            duration: 3500,
            style: {
              borderRadius: "12px",
              padding: "12px 16px",
              fontSize: "14px",
            },
          }}
        />
      </body>
    </html>
  );
}
