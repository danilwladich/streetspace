"use client";

import ChangePasswordForm from "@/components/forms/settings/change-password-form";
import { useAppTranslation } from "@/hooks/use-app-translation";

import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export default function ChangePasswordModal() {
  const { t } = useAppTranslation("forms.changePassword");

  return (
    <DialogContent className="sm:max-w-md">
      <DialogHeader>
        <DialogTitle>{t("title")}</DialogTitle>
        <DialogDescription>{t("description")}</DialogDescription>
      </DialogHeader>

      <ChangePasswordForm />
    </DialogContent>
  );
}
