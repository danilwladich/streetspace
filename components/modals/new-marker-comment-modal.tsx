"use client";

import { useModalStore } from "@/hooks/store/use-modal-store";
import { useTranslations } from "next-intl";

import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import MarkerCommentForm from "@/components/forms/marker/marker-comment-form";
import RecaptchaProvider from "@/components/providers/recaptcha-provider";

export default function NewMarkerCommentModal() {
  const t = useTranslations("forms.markerCommentInput");

  const { data } = useModalStore();

  const { newMarkerCommentData } = data || {};

  if (!newMarkerCommentData) {
    return null;
  }

  const { id, address } = newMarkerCommentData;

  return (
    <DialogContent className="sm:max-w-md">
      <DialogHeader>
        <DialogTitle>{t("title")}</DialogTitle>
        <DialogDescription>{address}</DialogDescription>
      </DialogHeader>

      <RecaptchaProvider>
        <MarkerCommentForm id={id} />
      </RecaptchaProvider>
    </DialogContent>
  );
}
