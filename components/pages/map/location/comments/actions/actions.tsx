"use client";

import { useAuthStore } from "@/hooks/store/use-auth-store";
import { useTranslations } from "next-intl";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import DeleteButton from "./delete-button";

export default function Actions({
  id,
  isOwner,
}: {
  id: number;
  isOwner: boolean;
}) {
  const t = useTranslations("pages.map.location.comments.actions");

  const { user: authUser } = useAuthStore();

  const isAdmin = authUser?.role === "ADMIN";

  if (!isAdmin && !isOwner) {
    return null;
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <MoreHorizontal className="h-6 w-6" />
          <span className="sr-only">{t("open")}</span>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>{t("label")}</DropdownMenuLabel>

        <DropdownMenuSeparator />

        <DropdownMenuGroup>
          <DeleteButton id={id} />
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
