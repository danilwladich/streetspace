"use client";

import { useState } from "react";
import { useLanguageStore } from "@/hooks/store/use-language";
import { languages } from "@/components/providers/translation-provider";
import { useTranslation } from "react-i18next";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { CommandItem } from "@/components/ui/command";
import { Languages } from "lucide-react";

const langMap: Record<(typeof languages)[number], string> = {
  en: "English",
  pl: "Polski",
};

export default function LanguageToggle() {
  const { t } = useTranslation("settings");

  const { setLang } = useLanguageStore();
  const [isOpen, setIsOpen] = useState(false);

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
        {languages.map((lang) => (
          <DropdownMenuItem key={lang} onClick={() => setLang(lang)}>
            {langMap[lang]}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
