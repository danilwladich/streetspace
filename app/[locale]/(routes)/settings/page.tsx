"use client";

import { useAuthStore } from "@/hooks/store/use-auth-store";
import { useTranslations } from "next-intl";

import ThemeToggle from "@/components/pages/settings/theme-toggle";
import LanguageToggle from "@/components/pages/settings/language-toggle";
import StarsButton from "@/components/pages/settings/stars-button";
import LogOutButton from "@/components/pages/settings/log-out-button";
import ChangePasswordButton from "@/components/pages/settings/change-password-button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export default function Settings() {
  const t = useTranslations("pages.settings");

  const { user: authUser } = useAuthStore();

  return (
    <Card className="max-w-lg">
      <CardHeader>
        <CardTitle>
          <h1>{t("title")}</h1>
        </CardTitle>
      </CardHeader>

      <CardContent>
        <div className="p-1">
          <h3 className="px-3 py-1 text-xs font-medium text-muted-foreground">
            {t("group.general")}
          </h3>

          <ThemeToggle />

          <LanguageToggle />

          <StarsButton />
        </div>

        {!!authUser && <Separator />}

        {!!authUser && (
          <div className="p-1">
            <h3 className="px-3 py-1 text-xs font-medium text-muted-foreground">
              {t("group.profile")}
            </h3>

            <ChangePasswordButton />

            <LogOutButton />
          </div>
        )}
      </CardContent>
    </Card>
  );
}
