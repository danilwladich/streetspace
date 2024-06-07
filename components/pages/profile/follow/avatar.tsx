"use client";

import { useUserImageSrc } from "@/hooks/use-user-image-src";
import Image from "next/image";

export default function FollowAvatar({
  avatar,
  username,
}: {
  avatar: string | null;
  username: string;
}) {
  const avatarSrc = useUserImageSrc(avatar);

  return (
    <div className="relative aspect-square overflow-hidden h-12 w-12 rounded-full md:h-16 md:w-16">
      <Image
        src={avatarSrc}
        alt={username}
        width={65}
        height={65}
        className="absolute left-0 top-0 h-full w-full object-cover"
      />
    </div>
  );
}
