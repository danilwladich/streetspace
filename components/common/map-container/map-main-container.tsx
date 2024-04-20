"use client";

import { useState } from "react";
import type { LatLngExpression, Map } from "leaflet";
import "leaflet/dist/leaflet.css";

import {
  MapContainer as LMapContainer,
  type MapContainerProps,
  TileLayer,
} from "react-leaflet";
import Controls from "./controls/map-controls";

export default function MapMainContainer({
  position,
  zoom,
  props,
  withUserLocation,
  children,
}: {
  position: LatLngExpression;
  zoom?: number | null;
  props?: MapContainerProps;
  withUserLocation?: boolean;
  children: React.ReactNode;
}) {
  const [map, setMap] = useState<Map | null>(null);

  return (
    <>
      <LMapContainer
        center={position}
        zoom={zoom || 14}
        zoomControl={false}
        ref={setMap}
        className="absolute left-0 top-0 z-0 h-full w-full"
        {...props}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {children}
      </LMapContainer>

      {!!map && <Controls map={map} withUserLocation={withUserLocation} />}
    </>
  );
}
