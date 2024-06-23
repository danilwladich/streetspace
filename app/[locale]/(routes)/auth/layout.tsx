import { getAppTitle } from "@/lib/get-app-title";
import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("pages.auth");

  const title = getAppTitle(t("title"));
  const description = t("description");

  return {
    title,
    description,
    openGraph: {
      title,
      description,
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
