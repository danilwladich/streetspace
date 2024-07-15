"use client";

import { useModalStore } from "@/hooks/store/use-modal-store";
import { useTranslations } from "next-intl";

import { Button } from "@/components/ui/button";
import { KeyRound } from "lucide-react";

export default function ChangePasswordButton() {
  const t = useTranslations("pages.settings");

  const { onOpen } = useModalStore();

  return (
    <Button
      className="w-full justify-start gap-2"
      variant="ghost"
      size="sm"
      onClick={() => onOpen("change password")}
    >
      <KeyRound className="h-4 w-4" />
      <span>{t("changePassword")}</span>
    </Button>
  );
}
