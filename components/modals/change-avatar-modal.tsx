import { useAuthStore } from "@/hooks/store/use-auth-store";
import { useTranslations } from "next-intl";

import ChangeAvatarForm from "@/components/forms/user/change-avatar-form";
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export default function ChangeAvatarModal() {
  const t = useTranslations("forms.changeAvatar");

  const { user } = useAuthStore();

  if (!user) {
    return null
  };

  return (
    <DialogContent className="sm:max-w-md">
      <DialogHeader>
        <DialogTitle>{t("title")}</DialogTitle>
        <DialogDescription>{t("description")}</DialogDescription>
      </DialogHeader>

      <ChangeAvatarForm />
    </DialogContent>
  );
}
