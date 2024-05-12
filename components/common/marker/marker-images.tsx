"use client";

import { useModalStore } from "@/hooks/store/use-modal-store";

import MarkerImage from "@/components/common/marker/marker-image";

export default function MarkerImages({
  images,
  alt,
}: {
  images: string;
  alt: string;
}) {
  const { onOpen } = useModalStore();

  const imagesSrc = JSON.parse(images) as string[];

  function onModalOpen(index: number) {
    const imagesData = {
      images: imagesSrc.map((src) => ({ src, alt })),
      startIndex: index,
    };
    onOpen("fullscreen images", { imagesData });
  }

  return (
    <div className="mb-2 grid w-full grid-cols-2 gap-2 sm:grid-cols-3">
      {imagesSrc.map((src, index) => (
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
