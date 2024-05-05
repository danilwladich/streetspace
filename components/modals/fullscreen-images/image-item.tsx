"use client";

import { useState } from "react";
import Image from "next/image";

import { LoaderCircle } from "lucide-react";

export default function ImageItem({ src, alt }: { src: string; alt: string }) {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <>
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
        onLoad={() => setIsLoaded(true)}
        className="absolute left-0 top-0 h-full w-full object-contain"
      />
    </>
  );
}
