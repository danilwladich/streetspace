import ChangePasswordForm from "@/components/forms/settings/change-password-form";
import { useTranslations } from "next-intl";

import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export default function ChangePasswordModal() {
  const t = useTranslations("forms.changePassword");

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
