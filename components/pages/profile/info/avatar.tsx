"use client";

import { useModalStore } from "@/hooks/store/use-modal-store";
import { useAuthStore } from "@/hooks/store/use-auth-store";
import { useUserImageSrc } from "@/hooks/use-user-image-src";
import Image from "next/image";
import type { User } from "@prisma/client";

import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
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

export default function UserAvatar({ id, username, avatar }: User) {
  const { onOpen } = useModalStore();
  const { user: authUser } = useAuthStore();

  const isOwner = id === authUser?.id;

  const avatarSrc = useUserImageSrc(avatar);
  const isDefaultAvatar = !avatar;

  function onPreviewOpen() {
    onOpen("image", { src: avatarSrc, alt: username });
  }

  return (
    <Avatar className="h-20 w-20 has-[button:focus-visible]:ring-2 has-[button:focus-visible]:ring-ring md:h-24 md:w-24">
      <AvatarImage asChild src={avatarSrc}>
        <>
          {isOwner && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="relative h-full w-full">
                  <Image
                    src={avatarSrc}
                    alt={username}
                    priority
                    width={100}
                    height={100}
                    className="absolute left-0 top-0 h-full w-full object-cover"
                  />
                </button>
              </DropdownMenuTrigger>

              <DropdownMenuContent className="w-56">
                <DropdownMenuLabel>Avatar</DropdownMenuLabel>

                <DropdownMenuSeparator />

                <DropdownMenuGroup>
                  {!isDefaultAvatar && (
                    <DropdownMenuItem onClick={() => onPreviewOpen()}>
                      <Fullscreen className="mr-2 h-4 w-4" />
                      <span>Preview</span>
                    </DropdownMenuItem>
                  )}

                  <DropdownMenuItem onClick={() => onOpen("change avatar")}>
                    <ImagePlus className="mr-2 h-4 w-4" />
                    <span>Change</span>
                  </DropdownMenuItem>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          )}

          {!isOwner && !isDefaultAvatar && (
            <button
              onClick={() => onPreviewOpen()}
              className="relative h-full w-full"
            >
              <Image
                src={avatarSrc}
                alt={username}
                priority
                width={100}
                height={100}
                className="absolute left-0 top-0 h-full w-full object-cover"
              />
            </button>
          )}

          {!isOwner && isDefaultAvatar && (
            <div className="relative h-full w-full">
              <Image
                src={avatarSrc}
                alt={username}
                priority
                width={100}
                height={100}
                className="absolute left-0 top-0 h-full w-full object-cover"
              />
            </div>
          )}
        </>
      </AvatarImage>
      <AvatarFallback>{username[0]}</AvatarFallback>
    </Avatar>
  );
}
