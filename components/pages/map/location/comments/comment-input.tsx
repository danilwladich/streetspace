"use client";

import { useAuthStore } from "@/hooks/store/use-auth-store";
import { useModalStore } from "@/hooks/store/use-modal-store";
import { Link } from "@/lib/navigation";
import { useTranslations } from "next-intl";

import { Button } from "@/components/ui/button";

export default function CommentInput({
  markerId,
  address,
}: {
  markerId: string;
  address: string;
}) {
  const t = useTranslations("pages.map.location.comments");

  const { user: authUser } = useAuthStore();
  const { onOpen } = useModalStore();

  if (!authUser) {
    return (
      <Link href={`/auth?redirect=/location/${markerId}`}>
        <Button tabIndex={-1} className="w-full">
          {t("input")}
        </Button>
      </Link>
    );
  }

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
