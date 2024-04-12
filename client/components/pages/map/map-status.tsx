"use client";

import { useMapStore } from "@/hooks/store/use-map-store";

import { LoaderCircle } from "lucide-react";

export default function MapStatus() {
  const { loadingUserPosition, loadingMarkers } = useMapStore();

  if (!loadingUserPosition && !loadingMarkers) {
    return null;
  }

  return (
    <div className="absolute bottom-2 left-12 z-[9999] pl-2 text-black ">
      <LoaderCircle className="h-4 w-4 animate-spin" />
    </div>
  );
}
