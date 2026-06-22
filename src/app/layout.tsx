import type { Metadata, Viewport } from "next";
import { Toaster } from "react-hot-toast";
import "./globals.css";

export const metadata: Metadata = {
  title: "約一下 - 找個有緣人，匿名聊一下",
  description: "約一下，找個有緣人陪你聊聊天 - 隨機配對、匿名安心、即時聊天。",
  keywords: ["約一下", "匿名聊天", "陌生人聊天", "隨機配對"],
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: "#f43f5e",
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
