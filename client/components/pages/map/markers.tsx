"use client";

import { useEffect, useState } from "react";
import { useMap } from "react-leaflet";
import { Point, divIcon } from "leaflet";
import { renderToStaticMarkup } from "react-dom/server";
import {
  MAP_ICON_SIZE,
  useMapStore,
  type Bounds,
} from "@/hooks/store/use-map-store";
import axios, { AxiosError } from "axios";
import type { MarkerType, MarkersType } from "@/types/MarkersType";

import UserMarker from "./user-marker";
import MarkerItem from "./marker-item";
import { MapPin } from "lucide-react";
import { toast } from "sonner";

export default function Markers() {
  const { bounds, setBounds } = useMapStore();
  const [markers, setMarkers] = useState<MarkerType[]>();

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

      try {
        const { data } = await axios.get<MarkersType>(
          `/api/map?latMin=${bounds.latMin}&latMax=${bounds.latMax}&lngMin=${bounds.lngMin}&lngMax=${bounds.lngMax}`,
        );
        setMarkers(data.data);
      } catch (e: unknown) {
        // Handling AxiosError
        const error = e as AxiosError;

        toast.error("Markers fetch error", { description: error.message });
      }
    }

    fetchLocations();
  }, [bounds]);

  return (
    <>
      <UserMarker />

      {!!markers &&
        markers.map((m) => <MarkerItem key={m.id} {...m} icon={icon} />)}
    </>
  );
}

const icon = divIcon({
  html: renderToStaticMarkup(
    <MapPin color="black" fill="white" className="h-full w-full" />,
  ),
  iconSize: new Point(MAP_ICON_SIZE, MAP_ICON_SIZE),
  iconAnchor: new Point(MAP_ICON_SIZE / 2, MAP_ICON_SIZE),
  popupAnchor: new Point(0, -MAP_ICON_SIZE),
  className: "",
});
