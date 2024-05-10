import { useAuthStore } from "@/hooks/store/use-auth-store";
import { useTranslations } from "next-intl";

import ChangeUsernameForm from "@/components/forms/user/change-username-form";
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export default function ChangeUsernameModal() {
  const t = useTranslations("forms.changeUsername");

  const { user } = useAuthStore();

  if (!user) {
    return null;
  }

  return (
    <DialogContent className="sm:max-w-md">
      <DialogHeader>
        <DialogTitle>{t("title")}</DialogTitle>
        <DialogDescription>{t("description")}</DialogDescription>
      </DialogHeader>

      <ChangeUsernameForm />
    </DialogContent>
  );
}
