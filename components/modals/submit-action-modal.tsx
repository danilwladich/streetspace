"use client";

import { useModalStore } from "@/hooks/store/use-modal-store";
import { useAuthStore } from "@/hooks/store/use-auth-store";
import { useTranslations } from "next-intl";

import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export default function SubmitActionModal() {
  const t = useTranslations("components.modal.submitAction");

  const { user } = useAuthStore();
  const { data, onClose } = useModalStore();

  const { submitActionData } = data || {};

  if (!submitActionData || !user) {
    return null;
  }

  const { description, onSubmit } = submitActionData;

  return (
    <DialogContent className="sm:max-w-md">
      <DialogHeader>
        <DialogTitle>{t("title")}</DialogTitle>
        <DialogDescription>{description}</DialogDescription>
      </DialogHeader>

      <DialogFooter>
        <Button onClick={onClose} variant="outline">
          {t("cancel")}
        </Button>

        <Button
          onClick={() => {
            onSubmit();
            onClose();
          }}
        >
          {t("submit")}
        </Button>
      </DialogFooter>
    </DialogContent>
  );
}
