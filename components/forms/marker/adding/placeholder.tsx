import { useTranslations } from "next-intl";

import { FormLabel } from "@/components/ui/form";
import { ImagePlus } from "lucide-react";

export default function Placeholder() {
  const t = useTranslations("forms.addMarker.images");

  return (
    <FormLabel className="group relative aspect-video cursor-pointer border border-dashed text-current duration-150">
      <span className="absolute -right-px -top-px z-10 hidden bg-cyan-500 px-1 text-sm font-normal leading-4 group-first:block">
        {t("main")}
      </span>

      <div className="absolute left-0 top-0 flex h-full w-full flex-col items-center justify-center gap-2">
        <ImagePlus className="h-6 w-6" />
        <span>{t("select")}</span>
      </div>
    </FormLabel>
  );
}
