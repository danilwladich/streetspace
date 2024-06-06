"use client";

import { getAppTitle } from "@/lib/get-app-title";
import { useAuthStore } from "@/hooks/store/use-auth-store";
import { useTranslations } from "next-intl";

import ShareButton from "@/components/common/dropdown/share-button";
import FavoriteButton from "./favorite-button";
import ReportButton from "./report-button";
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
  address,
  isFavorite,
}: {
  id: string;
  address: string;
  isFavorite: boolean;
}) {
  const t = useTranslations("pages.map.location.actions");

  const { user: authUser } = useAuthStore();

  const isAdmin = authUser?.role === "ADMIN";

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
          <ShareButton
            url={`/map/location/${id}`}
            text={getAppTitle(address)}
          />
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        <DropdownMenuGroup>
          <FavoriteButton id={id} isFavorite={isFavorite} />

          <ReportButton id={id} />
        </DropdownMenuGroup>

        {isAdmin && (
          <>
            <DropdownMenuSeparator />

            <DropdownMenuGroup>
              <DeleteButton id={id}/>
            </DropdownMenuGroup>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
