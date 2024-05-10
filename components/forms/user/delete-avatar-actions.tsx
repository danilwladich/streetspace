"use client";

import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/hooks/store/use-auth-store";
import { toast } from "sonner";
import { useModalStore } from "@/hooks/store/use-modal-store";
import { useTranslations } from "next-intl";

import { Button } from "@/components/ui/button";

export default function DeleteAvatarActions() {
  const t = useTranslations("forms.deleteAvatar");

  const router = useRouter();
  const { setUser } = useAuthStore();
  const { onClose } = useModalStore();

  async function onSubmit() {
    try {
      // Making a DELETE request to the user avatar API endpoint
      const { data } = await axios.delete("/api/user/avatar");

      // Updating the user state with the new avatar
      setUser(data);

      // Close the modal
      onClose();

      router.refresh();
    } catch (e: unknown) {
      // Handling AxiosError
      const error = e as AxiosError;

      toast.error(t("submitError"), { description: error.message });
      return;
    }
  }

  return (
    <>
      <Button onClick={onClose} variant="outline">
        {t("cancel")}
      </Button>
      <Button onClick={onSubmit}>{t("submit")}</Button>
    </>
  );
}
