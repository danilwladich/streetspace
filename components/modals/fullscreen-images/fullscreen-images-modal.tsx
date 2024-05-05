"use client";

import { useModalStore } from "@/hooks/store/use-modal-store";

import { DialogContent } from "@/components/ui/dialog";
import ImageItem from "./image-item";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
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
              <CarouselItem
                key={`${index}_${img.src}`}
                className="relative h-full w-full"
              >
                <ImageItem {...img} />
              </CarouselItem>
            ))}
          </CarouselContent>

          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      )}

      {!hasMultipleImages && (
        <div className="relative h-full w-full">
          <ImageItem {...images[0]} />
        </div>
      )}
    </DialogContent>
  );
}
