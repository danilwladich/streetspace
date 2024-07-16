"use client";

import ReactDOMServer from "react-dom/server";
import { Point, divIcon, type LatLngExpression } from "leaflet";
import { Marker } from "react-leaflet";
import { MAP_ICON_SIZE } from "@/hooks/store/use-map-store";

import MapMainContainer from "./map-main-container";
import { MapPin } from "lucide-react";

export default function MapSingleMarker({
  position,
}: {
  position: LatLngExpression;
}) {
  return (
    <MapMainContainer
      position={position}
      zoom={16}
      props={{
        scrollWheelZoom: false,
        dragging: false,
      }}
      singleMarker={true}
    >
      <Marker
        position={position}
        icon={getIcon()}
        interactive={false}
        keyboard={false}
      />
    </MapMainContainer>
  );
}

function getIcon() {
  return divIcon({
    html: ReactDOMServer.renderToString(
      <MapPin
        strokeWidth={1}
        className="absolute left-0 top-0 !h-full !w-full fill-red-400"
      />,
    ),
    iconSize: new Point(MAP_ICON_SIZE, MAP_ICON_SIZE),
    iconAnchor: new Point(MAP_ICON_SIZE / 2, MAP_ICON_SIZE),
    popupAnchor: new Point(0, -MAP_ICON_SIZE),
    className: "",
  });
}
