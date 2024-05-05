"use client";

import { useAuthStore } from "@/hooks/store/use-auth-store";
import { useTranslations } from "next-intl";

import ThemeToggle from "@/components/pages/settings/theme-toggle";
import LanguageToggle from "@/components/pages/settings/language-toggle";
import StarsButton from "@/components/pages/settings/stars-button";
import LogOutButton from "@/components/pages/settings/log-out-button";
import ChangePasswordButton from "@/components/pages/settings/change-password-button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";

export default function Settings() {
  const t = useTranslations("pages.settings.command");

  const { user: authUser } = useAuthStore();

  return (
    <Card className="max-w-lg">
      <CardContent>
        <Command>
          <CommandInput tabIndex={1} placeholder={t("placeholder")} />
          <CommandList>
            <CommandEmpty>{t("empty")}</CommandEmpty>

            <CommandGroup heading={t("group.general")}>
              <ThemeToggle />

              <LanguageToggle />

              <StarsButton />
            </CommandGroup>

            {!!authUser && (
              <>
                <CommandSeparator />

                <CommandGroup heading={t("group.profile")}>
                  <ChangePasswordButton />

                  <LogOutButton />
                </CommandGroup>
              </>
            )}
          </CommandList>
        </Command>
      </CardContent>
    </Card>
  );
}
