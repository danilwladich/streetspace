"use client";

import { useCallback } from "react";
import { useMapStore } from "@/hooks/store/use-map-store";
import type { Map } from "leaflet";

import { Button } from "@/components/ui/button";
import { Navigation, NavigationOff, ZoomIn, ZoomOut } from "lucide-react";

export default function MapControls({ map }: { map: Map }) {
  const { userPosition } = useMapStore();

  const locationIcon = userPosition ? (
    <Navigation className="h-4 w-4" />
  ) : (
    <NavigationOff className="h-4 w-4" />
  );

  const locationOnClick = useCallback(() => {
    if (!userPosition) {
      return;
    }

    map.flyTo(userPosition, 16, { duration: 0.5 });
  }, [map, userPosition]);

  return (
    <>
      <div className="absolute left-2 top-2 z-10 flex flex-col gap-1 md:bottom-2 md:top-auto">
        <Button variant="outline" size="icon" onClick={locationOnClick}>
          {locationIcon}
        </Button>

        <Button variant="outline" size="icon" onClick={() => map.zoomIn()}>
          <ZoomIn className="h-4 w-4" />
        </Button>

        <Button variant="outline" size="icon" onClick={() => map.zoomOut()}>
          <ZoomOut className="h-4 w-4" />
        </Button>
      </div>
    </>
  );
}
