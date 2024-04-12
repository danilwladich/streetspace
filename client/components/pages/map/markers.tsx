"use client";

import { useEffect, useState } from "react";
import { useMap } from "react-leaflet";
import { useMapStore, type Bounds } from "@/hooks/store/use-map-store";
import axios, { AxiosError } from "axios";
import type { MarkerType } from "@/types/MarkerType";
import type { StrapiArray } from "@/types/StrapiArray";

import UserMarker from "./user-marker";
import MarkerItem from "./marker-item";
import MarkerInput from "./marker-input";
import { toast } from "sonner";

export default function Markers() {
  const { bounds, setBounds, setLoadingMarkers } = useMapStore();
  const [markers, setMarkers] = useState<MarkerType[]>([]);

  const map = useMap();

  useEffect(() => {
    map.on("moveend", (e) => {
      const b = e.target.getBounds().toBBoxString().split(",");
      const currentBounds: Bounds = {
        latMin: parseFloat(b[1]),
        latMax: parseFloat(b[3]),
        lngMin: parseFloat(b[0]),
        lngMax: parseFloat(b[2]),
      };
      setBounds(currentBounds);
    });

    return () => {
      map.off();
    };
  }, [map]);

  useEffect(() => {
    async function fetchLocations() {
      if (!bounds) {
        return;
      }

      setLoadingMarkers(true);

      try {
        const { data } = await axios.get<StrapiArray<MarkerType>>(`/api/map`, {
          params: { ...bounds },
        });

        setMarkers(data.data);
      } catch (e: unknown) {
        // Handling AxiosError
        const error = e as AxiosError;

        toast.error("Markers fetch error", { description: error.message });
      }

      setLoadingMarkers(false);
    }

    fetchLocations();
  }, [bounds]);

  return (
    <>
      <UserMarker />

      {markers.map((c) => (
        <MarkerItem key={c.id} {...c} />
      ))}

      <MarkerInput />
    </>
  );
}
