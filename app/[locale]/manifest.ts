import { getAppTitle } from "@/lib/get-app-title";
import { getTranslations } from "next-intl/server";
import { MetadataRoute } from "next";

export default async function manifest(): Promise<MetadataRoute.Manifest> {
  const t = await getTranslations("metadata");

  return {
    name: getAppTitle(),
    short_name: getAppTitle(),
    description: t("description"),
    start_url: "/",
    display: "standalone",
    background_color: "#fff",
    theme_color: "#fff",
    icons: [
      {
        src: "/favicon/android-chrome-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/favicon/android-chrome-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
