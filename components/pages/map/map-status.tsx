"use client";

import { useMapStore } from "@/hooks/store/use-map-store";

import { LoaderCircle } from "lucide-react";

export default function MapStatus() {
  const { loadingUserPosition, loadingMarkers } = useMapStore();

  if (!loadingUserPosition && !loadingMarkers) {
    return null;
  }

  return (
    <div className="absolute top-2 right-2 z-[9999] text-black md:left-12 md:top-auto md:right-auto md:bottom-2 md:pl-2">
      <LoaderCircle className="h-4 w-4 animate-spin" />
    </div>
  );
}
