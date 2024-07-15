"use client";

import { useTransition } from "react";
import { useTranslations } from "next-intl";
import { locales } from "@/i18n";
import { useRouter, usePathname } from "@/lib/navigation";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Languages } from "lucide-react";

const localesMap: Record<(typeof locales)[number], string> = {
  en: "English",
  pl: "Polski",
  ru: "Русский",
};

export default function LanguageToggle() {
  const t = useTranslations("pages.settings");

  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const pathname = usePathname();

  function handleLocaleUpdate(locale: string) {
    startTransition(() => {
      router.replace(pathname, { locale });
    });
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          className="w-full justify-start gap-2"
          variant="ghost"
          size="sm"
        >
          <Languages className="h-4 w-4" />
          <span>{t("languageToggle")}</span>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="start">
        {locales.map((l) => (
          <DropdownMenuItem
            key={l}
            onClick={() => handleLocaleUpdate(l)}
            disabled={isPending}
          >
            {localesMap[l]}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
