import { getAppTitle } from "@/lib/get-app-title";
import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("pages.auth");

  return {
    title: getAppTitle(t("title")),
    description: t("description"),
    openGraph: {
      title: getAppTitle(t("title")),
      description: t("description"),
    },
  };
}

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
