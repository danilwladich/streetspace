"use client";

import { useModalStore } from "@/hooks/store/use-modal-store";

import { DialogContent } from "@/components/ui/dialog";

export default function ImageModal() {
  const { data } = useModalStore();

  const { src, alt } = data || {};

  return (
    <DialogContent className="sm:max-w-[425px]">
      <div className="relative h-0 w-full pb-[100%]">
        <img
          src={src}
          alt={alt}
          className="absolute left-0 top-0 h-full w-full object-contain"
        />
      </div>
    </DialogContent>
  );
}
