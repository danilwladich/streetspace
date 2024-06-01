"use client";

import { useUserImageSrc } from "@/hooks/use-user-image-src";
import Image from "next/image";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function FollowAvatar({
  avatar,
  username,
}: {
  avatar: string | null;
  username: string;
}) {
  const avatarSrc = useUserImageSrc(avatar);

  return (
    <Avatar className="h-12 w-12 md:h-16 md:w-16">
      <AvatarImage asChild src={avatarSrc}>
        <div className="relative h-full w-full">
          <Image
            src={avatarSrc}
            alt={username}
            width={70}
            height={70}
            className="absolute left-0 top-0 h-full w-full object-cover"
          />
        </div>
      </AvatarImage>
      <AvatarFallback>{username[0]}</AvatarFallback>
    </Avatar>
  );
}
