"use client";

import { useState } from "react";
import type { LatLngExpression, Map } from "leaflet";
import "leaflet/dist/leaflet.css";

import { MapContainer as LMapContainer, TileLayer } from "react-leaflet";
import Controls from "./map-controls";

export default function MapMainContainer({
  position,
  zoom = 14,
  children,
}: {
  position: LatLngExpression;
  zoom?: number;
  children: React.ReactNode;
}) {
  const [map, setMap] = useState<Map | null>(null);

  return (
    <>
      <LMapContainer
        center={position}
        zoom={zoom}
        zoomControl={false}
        ref={setMap}
        className="absolute left-0 top-0 z-0 h-full w-full"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {children}
      </LMapContainer>

      {!!map && <Controls map={map} />}
    </>
  );
}
