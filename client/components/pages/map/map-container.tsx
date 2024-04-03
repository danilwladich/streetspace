"use client";

import { MapContainer, TileLayer } from "react-leaflet";
import { type LatLng } from "leaflet";
import Markers from "./markers";
import "leaflet/dist/leaflet.css";


export interface Bounds {
  latMin: number;
  latMax: number;
  lngMin: number;
  lngMax: number;
}

const defaultMapData: { position: LatLng; bounds: Bounds } | null = JSON.parse(
  localStorage.getItem("mapData") || "null",
);

export default function MapComponent() {
  const { position, bounds } = defaultMapData || {};

  return (
    <MapContainer
      center={position || [52.243427, 21.001797]}
      zoom={13}
      scrollWheelZoom={false}
      className="z-0 h-screen w-full"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Markers defaultPosition={position} defaultBounds={bounds} />
    </MapContainer>
  );
}
