"use client";

import { useState } from "react";
import { useModalStore } from "@/hooks/store/use-modal-store";
import Image from "next/image";

import { DialogContent } from "@/components/ui/dialog";
import { LoaderCircle } from "lucide-react";

export default function ImageModal() {
  const [isLoaded, setIsLoaded] = useState(false);
  const { data } = useModalStore();

  const { src, alt } = data || {};

  if (!src || !alt) {
    return null;
  }

  return (
    <DialogContent className="aspect-square max-h-[100vh] sm:max-w-3xl">
      <div className="relative h-full w-full">
        {!isLoaded && (
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            <LoaderCircle className="h-8 w-8 animate-spin opacity-70" />
          </div>
        )}

        <Image
          src={src}
          alt={alt}
          width={770}
          height={770}
          priority
          onLoad={() => setIsLoaded(true)}
          className="absolute left-0 top-0 h-full w-full object-contain"
        />
      </div>
    </DialogContent>
  );
}
