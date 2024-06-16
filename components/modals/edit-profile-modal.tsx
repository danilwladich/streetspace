import { useAuthStore } from "@/hooks/store/use-auth-store";
import { useTranslations } from "next-intl";

import EditProfileForm from "@/components/forms/user/edit-profile/edit-profile-form";
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export default function EditProfileModal() {
  const t = useTranslations("forms.editProfile");

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

      <EditProfileForm />
    </DialogContent>
  );
}
