"use client";

import { useAuthStore } from "@/hooks/store/use-auth-store";
import { useModalStore } from "@/hooks/store/use-modal-store";
import { getAppTitle } from "@/lib/get-app-title";
import { useTranslations } from "next-intl";
import type { User } from "@prisma/client";

import ShareButton from "@/components/common/dropdown/share-button";
import LogOutButton from "@/components/pages/profile/actions/log-out-button";
import FollowButton from "@/components/pages/profile/actions/follow-button";
import BlockButton from "@/components/pages/profile/actions/block-button";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal, Pencil, UserCog } from "lucide-react";

export default function Actions({
  id,
  username,
  blocked,
  isFollowing,
}: User & {
  isFollowing: boolean;
}) {
  const t = useTranslations("pages.profile.actions");

  const { user: authUser } = useAuthStore();
  const { onOpen } = useModalStore();

  const isOwner = id === authUser?.id;
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
        <DropdownMenuLabel>
          {isOwner ? t("myProfile") : username}
        </DropdownMenuLabel>

        <DropdownMenuSeparator />

        <DropdownMenuGroup>
          <ShareButton
            url={`/profile/${username}`}
            text={getAppTitle(username)}
          />

          {!isOwner && (
            <FollowButton
              id={id}
              username={username}
              isFollowing={isFollowing}
            />
          )}
        </DropdownMenuGroup>

        {isOwner && (
          <>
            <DropdownMenuSeparator />

            <DropdownMenuGroup>
              <DropdownMenuItem onClick={() => onOpen("change username")}>
                <Pencil className="mr-2 h-4 w-4" />
                <span className="flex-1">{t("changeUsername")}</span>
              </DropdownMenuItem>

              <DropdownMenuItem onClick={() => onOpen("edit profile")}>
                <UserCog className="mr-2 h-4 w-4" />
                <span className="flex-1">{t("editProfile")}</span>
              </DropdownMenuItem>
            </DropdownMenuGroup>

            <DropdownMenuSeparator />

            <DropdownMenuGroup>
              <DropdownMenuItem>
                <LogOutButton />
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </>
        )}

        {!isOwner && isAdmin && (
          <>
            <DropdownMenuSeparator />

            <DropdownMenuGroup>
              <BlockButton id={id} blocked={blocked} />
            </DropdownMenuGroup>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
