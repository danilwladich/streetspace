"use client";

import { useUserImageSrc } from "@/hooks/use-user-image-src";

import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

export default function UserInfo({
  username,
  avatarUrl,
}: {
  username: string;
  avatarUrl?: string;
}) {
  return (
    <div className="flex w-full items-center gap-2 overflow-hidden md:gap-4">
      <Avatar className="h-20 w-20 md:h-24 md:w-24">
        <AvatarImage src={useUserImageSrc(avatarUrl)} alt={username} />
        <AvatarFallback>{username[0]}</AvatarFallback>
      </Avatar>

      <h2 className="truncate text-xl font-semibold">{username}</h2>
    </div>
  );
}
