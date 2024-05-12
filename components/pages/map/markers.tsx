"use client";

import { useEffect, useState } from "react";
import { useMap } from "react-leaflet";
import { useMapStore, type Bounds } from "@/hooks/store/use-map-store";
import axios, { AxiosError } from "axios";
import { useTranslations } from "next-intl";
import type { Marker } from "@prisma/client";

import UserMarker from "./user-marker";
import MarkerItem from "./marker-item";
import MarkerInput from "./marker-input";
import { toast } from "sonner";

export default function Markers() {
  const t = useTranslations("pages.map.markers");

  const { bounds, setBounds, setLoadingMarkers, setPosition, setZoom } =
    useMapStore();
  const [markers, setMarkers] = useState<Marker[]>([]);

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

      setPosition(e.target.getCenter());
      setZoom(e.target.getZoom());

      localStorage.setItem(
        "mapData",
        JSON.stringify({
          position: e.target.getCenter(),
          zoom: e.target.getZoom(),
          bounds: currentBounds,
        }),
      );
    });

    return () => {
      map.off();
    };
  }, [map, setBounds, setPosition, setZoom]);

  useEffect(() => {
    async function fetchLocations() {
      if (!bounds) {
        return;
      }

      setLoadingMarkers(true);

      try {
        const { data } = await axios.get<Marker[]>(`/api/map`, {
          params: { ...bounds },
        });

        setMarkers(data);
      } catch (e: unknown) {
        // Handling AxiosError
        const error = e as AxiosError;

        toast.error(t("fetchError"), { description: error.message });
      }

      setLoadingMarkers(false);
    }

    fetchLocations();
  }, [bounds, setLoadingMarkers]);

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
