"use client";

import { useModalStore } from "@/hooks/store/use-modal-store";
import Image from "next/image";

export default function MarkerImage({
  src,
  alt,
}: {
  src: string;
  alt: string;
}) {
  const { onOpen } = useModalStore();

  function onClick() {
    onOpen("image", { src, alt });
  }

  return (
    <button
      onClick={onClick}
      className="relative aspect-video w-full overflow-hidden rounded-sm"
    >
      <Image
        src={src}
        alt={alt}
        width={260}
        height={260}
        className="absolute left-0 top-0 h-full w-full object-cover"
      />
    </button>
  );
}
