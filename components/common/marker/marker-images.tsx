"use client";

import { useModalStore } from "@/hooks/store/use-modal-store";

import MarkerImage from "@/components/common/marker/marker-image";

export default function MarkerImages({
  images,
  alt,
}: {
  images: string[];
  alt: string;
}) {
  const { onOpen } = useModalStore();

  function onModalOpen(index: number) {
    const imagesData = {
      images: images.map((src) => ({ src, alt })),
      startIndex: index,
    };
    onOpen("fullscreen images", { imagesData });
  }

  return (
    <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
      {images.map((src, index) => (
        <MarkerImage
          key={src}
          src={src}
          alt={alt}
          onModalOpen={() => onModalOpen(index)}
        />
      ))}
    </div>
  );
}
