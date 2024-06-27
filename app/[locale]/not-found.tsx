"use client";

import { useRouter } from "@/lib/navigation";
import { useTranslations } from "next-intl";
import type { Metadata } from "next";

import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  robots: {
    index: false,
    follow: false,
  },
};

export default function NotFound() {
  const t = useTranslations("pages.notFound");
  const router = useRouter();

  return (
    <div className="fixed left-0 top-0 flex h-screen w-screen items-center justify-center gap-6 bg-background">
      <h1 className="text-2xl font-semibold">404</h1>
      <Separator orientation="vertical" className="h-16" />

      <div className="flex flex-col items-center justify-center gap-1">
        <h2 className="text-lg">{t("title")}</h2>

        <Button variant="link" size="sm" onClick={router.back}>
          {t("back")}
        </Button>
      </div>
    </div>
  );
}
