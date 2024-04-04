"use client";

import { useModalStore } from "@/hooks/use-modal-store";
import { useUserImageSrc } from "@/hooks/use-user-image-src";
import type { StrapiImage } from "@/types/StrapiImage";

import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

export default function UserInfo({
  username,
  avatar,
}: {
  username: string;
  avatar: StrapiImage | null;
}) {
  const { onOpen } = useModalStore();

  const avatarUrl = avatar?.formats.thumbnail.url;
  const avatarSrc = useUserImageSrc(avatarUrl);

  return (
    <div className="flex w-full items-center gap-2 overflow-hidden md:gap-4">
      <button
        onClick={() =>
          onOpen("image", { src: avatar?.url || avatarSrc, alt: username })
        }
      >
        <Avatar className="h-20 w-20 md:h-24 md:w-24">
          <AvatarImage src={avatarSrc} alt={username} />
          <AvatarFallback>{username[0]}</AvatarFallback>
        </Avatar>
      </button>

      <h2 className="truncate text-xl font-semibold">{username}</h2>
    </div>
  );
}
