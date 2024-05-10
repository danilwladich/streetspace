import { useAuthStore } from "@/hooks/store/use-auth-store";
import { useTranslations } from "next-intl";

import DeleteAvatarActions from "@/components/forms/user/delete-avatar-actions";
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

export default function DeleteAvatarModal() {
  const t = useTranslations("forms.deleteAvatar");

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

      <DialogFooter>
        <DeleteAvatarActions />
      </DialogFooter>
    </DialogContent>
  );
}
