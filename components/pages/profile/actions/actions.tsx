"use client";

import { useAuthStore } from "@/hooks/store/use-auth-store";
import { useModalStore } from "@/hooks/store/use-modal-store";
import { getAppTitle } from "@/lib/get-app-title";
import type { User } from "@prisma/client";

import ShareButton from "@/components/pages/profile/actions/share-button";
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
import { MoreHorizontal, Pencil, ImagePlus } from "lucide-react";

export default function Actions({
  id,
  username,
  blocked,
  isFollowing,
}: User & {
  isFollowing: boolean;
}) {
  const { user: authUser } = useAuthStore();
  const { onOpen } = useModalStore();

  const isOwner = id === authUser?.id;
  const isAdmin = authUser?.role === "admin";

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <MoreHorizontal className="h-6 w-6" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>
          {isOwner ? "My account" : username}
        </DropdownMenuLabel>

        <DropdownMenuSeparator />

        <DropdownMenuGroup>
          <ShareButton
            url={`/profile/${username}`}
            text={getAppTitle(username)}
          />

          {!isOwner && (
            <>
              <FollowButton
                id={id}
                username={username}
                isFollowing={isFollowing}
              />

              {isAdmin && <BlockButton id={id} blocked={blocked} />}
            </>
          )}
        </DropdownMenuGroup>

        {isOwner && (
          <>
            <DropdownMenuSeparator />

            <DropdownMenuGroup>
              <DropdownMenuItem onClick={() => onOpen("change username")}>
                <Pencil className="mr-2 h-4 w-4" />
                <span>Change username</span>
              </DropdownMenuItem>

              <DropdownMenuItem onClick={() => onOpen("change avatar")}>
                <ImagePlus className="mr-2 h-4 w-4" />
                <span>Change avatar</span>
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
      </DropdownMenuContent>
    </DropdownMenu>
  );
}