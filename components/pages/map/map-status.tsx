"use client";

import { useMapStore } from "@/hooks/store/use-map-store";

import { LoaderCircle } from "lucide-react";

export default function MapStatus() {
  const { loadingUserPosition, loadingMarkers } = useMapStore();

  if (!loadingUserPosition && !loadingMarkers) {
    return null;
  }

  return (
    <div className="absolute right-2 top-2 z-[9999] text-black md:bottom-2 md:left-12 md:right-auto md:top-auto md:pl-2">
      <LoaderCircle className="h-4 w-4 animate-spin" />
    </div>
  );
}
