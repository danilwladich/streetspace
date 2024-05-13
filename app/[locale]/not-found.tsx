import { useTranslations } from "next-intl";

import { Separator } from "@/components/ui/separator";

export default function NotFound() {
  const t = useTranslations();

  return (
    <div className="fixed left-0 top-0 flex h-screen w-screen items-center justify-center gap-6 bg-background">
      <span className="text-2xl font-semibold">404</span>
      <Separator orientation="vertical" className="h-14" />
      <h3 className="text-lg">{t("pages.notFound")}</h3>
    </div>
  );
}
