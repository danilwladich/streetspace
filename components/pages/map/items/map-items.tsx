"use client";

import { useMapEvents } from "@/hooks/pages/map/use-map-events";
import type { ConfirmedMarker } from "@/types/marker";

import UserMarker from "./user-marker";
import Markers from "./markers/markers";
import MarkerInput from "./marker-input";

export default function MapItems({ markers }: { markers: ConfirmedMarker[] }) {
  useMapEvents();

  return (
    <>
      <UserMarker />

      <Markers markers={markers} />

      <MarkerInput />
    </>
  );
}
