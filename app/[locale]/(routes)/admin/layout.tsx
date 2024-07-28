import { getTranslations } from "next-intl/server";
import { getPageMetadata } from "@/lib/metadata";
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("pages.admin");

  return getPageMetadata({
    pageName: t("title"),
    robots: false,
  });
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
