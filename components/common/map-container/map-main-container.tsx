"use client";

import { useState } from "react";
import { MAP_MIN_ZOOM } from "@/hooks/store/use-map-store";
import { useMediaQuery } from "@/hooks/use-media-query";
import { cn } from "@/lib/utils";
import type { LatLngExpression, Map } from "leaflet";
import "leaflet/dist/leaflet.css";

import {
  MapContainer as LMapContainer,
  type MapContainerProps,
  TileLayer,
  AttributionControl,
} from "react-leaflet";
import Controls from "./controls/map-controls";

export default function MapMainContainer({
  position,
  zoom,
  props,
  singleMarker,
  children,
}: {
  position: LatLngExpression;
  zoom: number;
  props?: MapContainerProps;
  singleMarker?: boolean;
  children: React.ReactNode;
}) {
  const [map, setMap] = useState<Map | null>(null);
  const { isMobile } = useMediaQuery();

  return (
    <>
      <LMapContainer
        center={position}
        zoom={zoom}
        zoomControl={false}
        ref={setMap}
        minZoom={MAP_MIN_ZOOM}
        maxBounds={[
          [-90, -180],
          [90, 180],
        ]}
        attributionControl={false}
        className={cn(
          "absolute left-0 top-0 z-0 h-full w-full",
          "[&_.leaflet-control-attribution]:!bg-transparent [&_.leaflet-control-attribution]:text-current [&_.leaflet-control-attribution]:backdrop-blur-sm",
          "[&_.leaflet-popup-content-wrapper]:bg-current [&_.leaflet-popup-content-wrapper]:text-background",
          "[&_.leaflet-popup-content]:m-0 [&_.leaflet-popup-content]:p-4 [&_.leaflet-popup-content]:text-black dark:[&_.leaflet-popup-content]:text-white",
          "[&_.leaflet-popup-tip]:bg-current [&_.leaflet-popup-tip]:text-background",
          "dark:[&_.leaflet-tile]:brightness-95 dark:[&_.leaflet-tile]:contrast-[0.9] dark:[&_.leaflet-tile]:hue-rotate-180 dark:[&_.leaflet-tile]:invert",
        )}
        {...props}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <AttributionControl
          position={!singleMarker && isMobile ? "topright" : "bottomright"}
          prefix={false}
        />
        {children}
      </LMapContainer>

      {!!map && <Controls map={map} singleMarker={singleMarker} />}
    </>
  );
}
