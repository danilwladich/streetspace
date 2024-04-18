"use client";

import { useModalStore } from "@/hooks/store/use-modal-store";
import { useAuthStore } from "@/hooks/store/use-auth-store";
import { useUserImageSrc } from "@/hooks/use-user-image-src";
import type { User } from "@prisma/client";

import UserAvatar from "./avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Fullscreen, ImagePlus } from "lucide-react";

export default function Info({ id, username, avatar }: User) {
  const { onOpen } = useModalStore();
  const { user: authUser } = useAuthStore();

  const isOwner = id === authUser?.id;

  const avatarSrc = useUserImageSrc(avatar);

  function onPreviewOpen() {
    onOpen("image", { src: avatarSrc, alt: username });
  }

  return (
    <div className="flex w-full items-center gap-2 overflow-hidden md:gap-4">
      {isOwner ? (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button>
              <UserAvatar
                src={avatarSrc}
                alt={username}
                fallback={username[0]}
              />
            </button>
          </DropdownMenuTrigger>

          <DropdownMenuContent className="w-56">
            <DropdownMenuLabel>Avatar</DropdownMenuLabel>

            <DropdownMenuSeparator />

            <DropdownMenuGroup>
              <DropdownMenuItem onClick={() => onPreviewOpen()}>
                <Fullscreen className="mr-2 h-4 w-4" />
                <span>Preview</span>
              </DropdownMenuItem>

              <DropdownMenuItem onClick={() => onOpen("change avatar")}>
                <ImagePlus className="mr-2 h-4 w-4" />
                <span>Change</span>
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <button onClick={() => onPreviewOpen()}>
          <UserAvatar src={avatarSrc} alt={username} fallback={username[0]} />
        </button>
      )}

      <h2 className="truncate text-xl font-semibold">{username}</h2>
    </div>
  );
}
