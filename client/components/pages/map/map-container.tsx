"use client";

import { useMapStore } from "@/hooks/store/use-map-store";
import "leaflet/dist/leaflet.css";

import { MapContainer, TileLayer } from "react-leaflet";
import Markers from "./markers";
import Controls from "./controls";

export default function MapComponent() {
  const { userPosition } = useMapStore();

  return (
    <MapContainer
      center={userPosition || [52.243427, 21.001797]}
      zoom={14}
      zoomControl={false}
      className="absolute left-0 top-0 z-0 h-full w-full"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Markers />
      <Controls />
    </MapContainer>
  );
}
