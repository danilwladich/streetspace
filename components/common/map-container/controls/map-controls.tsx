"use client";

import type { Map } from "leaflet";

import UserLocation from "./user-location";
import { Button } from "@/components/ui/button";
import { ZoomIn, ZoomOut } from "lucide-react";

export default function MapControls({
  map,
  withUserLocation = true,
}: {
  map: Map;
  withUserLocation?: boolean;
}) {
  return (
    <>
      <div className="absolute left-2 top-2 z-10 flex flex-col gap-1 md:bottom-2 md:top-auto">
        {withUserLocation && <UserLocation map={map} />}

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
