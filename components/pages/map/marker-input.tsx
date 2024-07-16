"use client";

import { useEffect, useState } from "react";
import ReactDOMServer from "react-dom/server";
import { Marker, useMap } from "react-leaflet";
import { MAP_ICON_SIZE, useMapStore } from "@/hooks/store/use-map-store";
import { type LeafletEvent, Point, divIcon } from "leaflet";

import { X } from "lucide-react";

export default function MarkerInput() {
  const { isInput } = useMapStore();

  const map = useMap();

  const [position, setPosition] = useState(map.getCenter());

  useEffect(() => {
    if (!isInput) {
      return;
    }

    setPosition(map.getCenter());

    function onMove(e: LeafletEvent) {
      setPosition(e.target.getCenter());
    }
    map.on("move", onMove);

    return () => {
      map.off("move", onMove);
    };
  }, [map, isInput]);

  if (!isInput) {
    return null;
  }

  return <Marker position={position} icon={getIcon()} zIndexOffset={100} />;
}

function getIcon() {
  return divIcon({
    html: ReactDOMServer.renderToString(
      <X
        strokeWidth={1}
        className="absolute left-0 top-0 !h-full !w-full"
      />,
    ),
    iconSize: new Point(MAP_ICON_SIZE, MAP_ICON_SIZE),
    iconAnchor: new Point(MAP_ICON_SIZE / 2, MAP_ICON_SIZE / 2),
    popupAnchor: new Point(0, 0),
    className: "relative",
  });
}
