"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import Image from "next/image";

import { LoaderCircle } from "lucide-react";

export default function ImageItem({ src, alt }: { src: string; alt: string }) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isBlurLoaded, setIsBlurLoaded] = useState(false);

  return (
    <>
      {(!isLoaded || !isBlurLoaded) && (
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
        className={cn(
          "absolute left-0 top-0 z-10 h-full w-full object-contain opacity-0",
          isLoaded && "opacity-100",
        )}
      />

      <Image
        src={src}
        alt="blur"
        width={25}
        height={25}
        onLoad={() => setIsBlurLoaded(true)}
        className={cn(
          "absolute left-0 top-0 h-full w-full object-cover opacity-0 blur-lg",
          isLoaded && "opacity-20",
        )}
      />
    </>
  );
}
