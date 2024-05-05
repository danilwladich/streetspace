"use client";

import { useModalStore } from "@/hooks/store/use-modal-store";
import { useAuthStore } from "@/hooks/store/use-auth-store";
import { useUserImageSrc } from "@/hooks/use-user-image-src";
import Image from "next/image";
import { useTranslations } from "next-intl";
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
import { Fullscreen, ImagePlus, Trash2 } from "lucide-react";

export default function UserAvatar({ id, username, avatar }: User) {
  const t = useTranslations("pages.profile.avatar");

  const { onOpen } = useModalStore();
  const { user: authUser } = useAuthStore();

  const isOwner = id === authUser?.id;

  const avatarSrc = useUserImageSrc(avatar);
  const isDefaultAvatar = !avatar;

  function onPreviewOpen() {
    const imagesData = {
      images: [{ src: avatarSrc, alt: username }],
    };
    onOpen("fullscreen images", { imagesData });
  }

  return (
    <Avatar className="h-24 w-24 has-[button:focus-visible]:ring-2 has-[button:focus-visible]:ring-ring md:h-36 md:w-36">
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
                    width={150}
                    height={150}
                    className="absolute left-0 top-0 h-full w-full object-cover"
                  />
                </button>
              </DropdownMenuTrigger>

              <DropdownMenuContent className="w-56">
                <DropdownMenuLabel>{t("title")}</DropdownMenuLabel>

                <DropdownMenuSeparator />

                <DropdownMenuGroup>
                  {!isDefaultAvatar && (
                    <DropdownMenuItem onClick={() => onPreviewOpen()}>
                      <Fullscreen className="mr-2 h-4 w-4" />
                      <span>{t("fullscreen")}</span>
                    </DropdownMenuItem>
                  )}

                  <DropdownMenuItem onClick={() => onOpen("change avatar")}>
                    <ImagePlus className="mr-2 h-4 w-4" />
                    <span>{t("change")}</span>
                  </DropdownMenuItem>

                  {!isDefaultAvatar && (
                    <DropdownMenuItem onClick={() => onOpen("delete avatar")}>
                      <Trash2 className="mr-2 h-4 w-4" />
                      <span>{t("delete")}</span>
                    </DropdownMenuItem>
                  )}
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
                width={150}
                height={150}
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
                width={150}
                height={150}
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
