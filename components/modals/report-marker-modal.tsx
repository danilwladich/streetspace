"use client";

import { useModalStore } from "@/hooks/store/use-modal-store";
import { useTranslations } from "next-intl";

import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import ReportMarkerForm from "@/components/forms/marker/report-marker-form";

export default function ReportMarkerModal() {
  const t = useTranslations("forms.reportMarker");

  const { data } = useModalStore();

  const { reportMarkerData } = data || {};

  if (!reportMarkerData) {
    return null;
  }

  const { id } = reportMarkerData;

  return (
    <DialogContent className="sm:max-w-md">
      <DialogHeader>
        <DialogTitle>{t("title")}</DialogTitle>
        <DialogDescription>{t("description")}</DialogDescription>
      </DialogHeader>

      <ReportMarkerForm id={id} />
    </DialogContent>
  );
}
