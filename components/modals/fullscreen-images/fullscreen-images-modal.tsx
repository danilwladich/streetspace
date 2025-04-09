"use client";

import { useModalStore } from "@/hooks/store/use-modal-store";

import {
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
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
    <DialogContent className="aspect-square max-h-dvh p-0 sm:max-w-3xl">
      <DialogHeader className="sr-only">
        <DialogTitle>{images[0].alt}</DialogTitle>
      </DialogHeader>

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
        <div className="relative h-full w-full overflow-hidden">
          <ImageItem {...images[0]} />
        </div>
      )}
    </DialogContent>
  );
}
