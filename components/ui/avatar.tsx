"use client";

import { useUserImageSrc } from "@/hooks/use-user-image-src";
import { cn } from "@/lib/utils";
import Image from "next/image";

export default function Avatar({
  avatar,
  username,
  width,
  height,
  className,
}: {
  avatar: string | null;
  username: string;
  width: number;
  height: number;
  className?: string;
}) {
  const avatarSrc = useUserImageSrc(avatar);

  return (
    <div
      className={cn(
        "relative aspect-square overflow-hidden rounded-full",
        className,
      )}
    >
      <Image
        src={avatarSrc}
        alt={username}
        width={width}
        height={height}
        className="absolute left-0 top-0 h-full w-full object-cover"
      />
    </div>
  );
}
