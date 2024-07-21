import { getAppTitle } from "@/lib/get-app-title";
import { getTranslations } from "next-intl/server";
import { getOpenGraphImages } from "@/lib/opengraph";
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("pages.auth");

  const title = getAppTitle(t("title"));
  const description = t("description");
  const images = getOpenGraphImages(t("title"));

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images,
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
