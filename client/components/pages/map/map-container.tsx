"use client";

import { useMapStore } from "@/hooks/store/use-map-store";
import type { LatLngExpression } from "leaflet";
import "leaflet/dist/leaflet.css";

import { MapContainer as LMapContainer, TileLayer } from "react-leaflet";
import Markers from "./markers";
import Controls from "./controls";
import MapStatus from "./map-status";

export default function MapContainer() {
  const { userPosition } = useMapStore();

  const mapCenter: LatLngExpression = userPosition || [52.243427, 21.001797];

  return (
    <LMapContainer
      center={mapCenter}
      zoom={14}
      zoomControl={false}
      className="absolute left-0 top-0 z-0 h-full w-full"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Markers />
      <MapStatus />
      <Controls />
    </LMapContainer>
  );
}
