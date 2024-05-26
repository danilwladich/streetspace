"use client";

import { useEffect } from "react";
import { useMapStore } from "@/hooks/store/use-map-store";

import MapItem from "./map-item";
import { useFetchMarkers } from "@/hooks/pages/map/use-fetch-markers";

export default function MapItems() {
  const { markers } = useMapStore();
  const { fetchMarkers } = useFetchMarkers();

  useEffect(() => {
    fetchMarkers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return markers.map((c) => <MapItem key={c.id} {...c} />);
}
