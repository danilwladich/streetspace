"use client";

import { useState, useTransition } from "react";
import { useTranslations } from "next-intl";
import { locales } from "@/i18n";
import { useLocaleNavigation } from "@/hooks/use-locale-navigation";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { CommandItem } from "@/components/ui/command";
import { Languages } from "lucide-react";

const localesMap: Record<(typeof locales)[number], string> = {
  en: "English",
  pl: "Polski",
  ru: "Русский",
};

export default function LanguageToggle() {
  const t = useTranslations("pages.settings");

  const [isOpen, setIsOpen] = useState(false);

  const { useRouter, usePathname } = useLocaleNavigation();

  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const pathname = usePathname();

  function handleLocaleUpdate(locale: string) {
    startTransition(() => {
      router.replace({ pathname }, { locale });
    });
  }

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <CommandItem
          className="flex w-full items-center gap-2"
          onSelect={() => setIsOpen((prev) => !prev)}
        >
          <Languages className="h-4 w-4" />
          <span className="flex-1">{t("languageToggle")}</span>
        </CommandItem>
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
