"use client";

import { useMapEvents } from "@/hooks/pages/map/use-map-events";

import UserMarker from "./user-marker";
import MapItems from "./map-items/map-items";
import MarkerInput from "./marker-input";

export default function Markers() {
  useMapEvents();

  return (
    <>
      <UserMarker />

      <MapItems />

      <MarkerInput />
    </>
  );
}
