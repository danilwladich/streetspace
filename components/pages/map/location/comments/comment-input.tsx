"use client";

import { useTranslations } from "next-intl";
import { useModalStore } from "@/hooks/store/use-modal-store";

import { Button } from "@/components/ui/button";

export default function CommentInput({
  markerId,
  address,
}: {
  markerId: string;
  address: string;
}) {
  const t = useTranslations("pages.map.location.comments");

  const { onOpen } = useModalStore();

  function onClick() {
    const newMarkerCommentData = {
      id: markerId,
      address,
    };
    onOpen("new marker comment", { newMarkerCommentData });
  }

  return (
    <Button onClick={onClick} className="w-full">
      {t("input")}
    </Button>
  );
}
