"use client";

import { useCallback } from "react";
import { useMapStore } from "@/hooks/store/use-map-store";
import type { Map } from "leaflet";

import { Button } from "@/components/ui/button";
import { Navigation, NavigationOff } from "lucide-react";

export default function UserLocation({ map }: { map: Map }) {
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
    <Button variant="outline" size="icon" onClick={locationOnClick}>
      {locationIcon}
    </Button>
  );
}
