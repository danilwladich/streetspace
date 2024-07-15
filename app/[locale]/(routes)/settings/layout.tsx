import { getAppTitle } from "@/lib/get-app-title";
import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("pages.settings");

  const title = getAppTitle(t("title"));

  return {
    title,
    openGraph: {
      title,
    },
  };
}

export default function SettingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
