"use client";

import { useMapStore } from "@/hooks/store/use-map-store";
import type { ConfirmedMarker } from "@/types/marker";

import MapMainContainer from "@/components/common/map-container/map-main-container";
import MapItems from "./items/map-items";

export default function MapContainer({
  markers,
}: {
  markers: ConfirmedMarker[];
}) {
  const { position, zoom } = useMapStore();

  return (
    <MapMainContainer position={position || [45, 0]} zoom={zoom || 2}>
      <MapItems markers={markers} />
    </MapMainContainer>
  );
}
