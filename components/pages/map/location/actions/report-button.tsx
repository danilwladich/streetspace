"use client";

import { useModalStore } from "@/hooks/store/use-modal-store";
import { useTranslations } from "next-intl";

import { Flag } from "lucide-react";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";

export default function ReportButton({ id }: { id: string }) {
  const t = useTranslations("pages.map.location.actions");

  const { onOpen } = useModalStore();

  return (
    <DropdownMenuItem
      // onClick={() => onOpen("reportMarker", { id })}
      className="flex gap-2"
    >
      <Flag className="h-4 w-4" />

      <span>{t("report")}</span>
    </DropdownMenuItem>
  );
}
