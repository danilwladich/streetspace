import { getTranslations } from "next-intl/server";
import { getPageMetadata } from "@/lib/metadata";
import type { Metadata } from "next";

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const t = await getTranslations("pages.settings");

  return getPageMetadata({
    path: "/settings",
    pageName: t("title"),
    locale,
  });
}

export default function SettingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
