"use client";

import { useModalStore } from "@/hooks/store/use-modal-store";
import { getImageUrl } from "@/lib/get-image-url";
import type { StrapiImage } from "@/types/StrapiImage";

export default function MarkerImage(image: StrapiImage) {
  const { onOpen } = useModalStore();

  const src = getImageUrl(image, "small");

  function onClick() {
    const previewSrc = getImageUrl(image, "large");
    onOpen("image", { src: previewSrc, alt: `${image.id}` });
  }

  return (
    <button
      onClick={onClick}
      className="relative aspect-video w-full overflow-hidden rounded-sm"
    >
      <img
        src={src}
        alt={`${image.id}`}
        className="absolute left-0 top-0 h-full w-full object-cover"
      />
    </button>
  );
}
