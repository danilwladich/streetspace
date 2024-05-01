"use client";

import { useModalStore } from "@/hooks/store/use-modal-store";

import { DialogContent } from "@/components/ui/dialog";
import ImageItem from "./image-item";
import {
  Carousel,
  CarouselContent,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export default function FullscreenImagesModal() {
  const { data } = useModalStore();

  const { imagesData } = data || {};

  if (!imagesData) {
    return null;
  }

  const { images, startIndex } = imagesData;

  const hasMultipleImages = images.length > 1;

  return (
    <DialogContent className="aspect-square max-h-[100vh] sm:max-w-3xl">
      {hasMultipleImages && (
        <Carousel
          opts={{
            startIndex,
          }}
        >
          <CarouselContent>
            {images.map((img, index) => (
              <ImageItem key={`${index}_${img.src}`} {...img} />
            ))}
          </CarouselContent>

          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      )}

      {!hasMultipleImages && <ImageItem {...images[0]} />}
    </DialogContent>
  );
}
