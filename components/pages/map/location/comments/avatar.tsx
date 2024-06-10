"use client";

import { useUserImageSrc } from "@/hooks/use-user-image-src";
import Image from "next/image";

export default function CommentAvatar({
  avatar,
  username,
}: {
  avatar: string | null;
  username: string;
}) {
  const avatarSrc = useUserImageSrc(avatar);

  return (
    <div className="relative aspect-square h-12 w-12 overflow-hidden rounded-full md:h-14 md:w-14">
      <Image
        src={avatarSrc}
        alt={username}
        width={60}
        height={60}
        className="absolute left-0 top-0 h-full w-full object-cover"
      />
    </div>
  );
}
