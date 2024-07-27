"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";

import { User } from "lucide-react";

export default function Avatar({
  avatar,
  username,
  width,
  height,
  priority,
  className,
}: {
  avatar?: string | null;
  username: string;
  width: number;
  height: number;
  priority?: boolean;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "relative aspect-square overflow-hidden rounded-full",
        className,
      )}
    >
      {avatar ? (
        <Image
          src={avatar}
          alt={username}
          width={width}
          height={height}
          priority={priority}
          className="absolute left-0 top-0 !h-full !w-full object-cover"
        />
      ) : (
        <div className="absolute left-0 top-0 flex h-full w-full items-center justify-center rounded-full border-2 border-current bg-background">
          <User className="h-1/2 w-1/2" />
        </div>
      )}
    </div>
  );
}
