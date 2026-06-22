// /manifest.webmanifest - PWA / 行動裝置「加入主畫面」設定
import type { MetadataRoute } from "next";
import { SITE_NAME, SITE_DESCRIPTION } from "@/lib/seo";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${SITE_NAME} - 找個有緣人，匿名聊一下`,
    short_name: SITE_NAME,
    description: SITE_DESCRIPTION,
    start_url: "/",
    display: "standalone",
    orientation: "portrait",
    background_color: "#fff7ed",
    theme_color: "#f43f5e",
    lang: "zh-TW",
    categories: ["social", "communication", "lifestyle"],
    icons: [
      {
        src: "/icon.svg",
        sizes: "any",
        type: "image/svg+xml",
        purpose: "any",
      },
    ],
  };
}
