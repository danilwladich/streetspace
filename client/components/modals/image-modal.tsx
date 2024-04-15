"use client";

import { useModalStore } from "@/hooks/store/use-modal-store";

import { DialogContent } from "@/components/ui/dialog";

export default function ImageModal() {
  const { data } = useModalStore();

  const { src, alt } = data || {};

  return (
    <DialogContent className="aspect-square max-h-[100vh] sm:max-w-3xl">
      <div className="relative h-full w-full">
        <img
          src={src}
          alt={alt}
          className="absolute left-0 top-0 h-full w-full object-contain"
        />
      </div>
    </DialogContent>
  );
}
