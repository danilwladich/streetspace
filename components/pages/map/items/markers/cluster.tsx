"use client";

import ReactDOMServer from "react-dom/server";
import { Marker as LMarker } from "react-leaflet";
import { divIcon, type LeafletMouseEvent, Point } from "leaflet";
import { MAP_ICON_SIZE } from "@/hooks/store/use-map-store";

export default function Cluster({
  lat,
  lng,
  pointCount,
  totalCount,
  onClick,
}: {
  lat: number;
  lng: number;
  pointCount: number;
  totalCount: number;
  onClick: (e: LeafletMouseEvent) => void;
}) {
  return (
    <LMarker
      position={[lat, lng]}
      eventHandlers={{ click: onClick }}
      icon={getIcon(pointCount, totalCount)}
      zIndexOffset={1}
    />
  );
}

function getIcon(count: number, totalCount: number) {
  const size = MAP_ICON_SIZE + (count / totalCount) * 10;

  return divIcon({
    html: ReactDOMServer.renderToString(
      <div className="flex !h-full !w-full items-center justify-center rounded-full border-2 border-current bg-background font-semibold">
        {count}
      </div>,
    ),
    iconSize: new Point(size, size),
    iconAnchor: new Point(size / 2, size / 2),
    className: "",
  });
}
