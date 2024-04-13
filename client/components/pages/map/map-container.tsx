"use client";

import { useMapStore } from "@/hooks/store/use-map-store";

import MapMainContainer from "@/components/common/map-container/map-main-container";
import Markers from "./markers";
import MapStatus from "./map-status";

export default function MapContainer() {
  const { userPosition } = useMapStore();

  return (
    <MapMainContainer position={userPosition || [52.243427, 21.001797]}>
      <Markers />
      <MapStatus />
    </MapMainContainer>
  );
}
