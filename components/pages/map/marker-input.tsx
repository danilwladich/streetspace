"use client";

import { useEffect, useState } from "react";
import { Marker, useMap } from "react-leaflet";
import { MAP_ICON_SIZE, useMapStore } from "@/hooks/store/use-map-store";
import { Point, divIcon } from "leaflet";

export default function MarkerInput() {
  const { isInput } = useMapStore();

  const map = useMap();

  const [position, setPosition] = useState(map.getCenter());

  useEffect(() => {
    if (!isInput) {
      return;
    }

    map.on("move", (e) => {
      setPosition(e.target.getCenter());
    });

    return () => {
      map.off();
    };
  }, [map, isInput]);

  if (!isInput) {
    return null;
  }

  return <Marker position={position} icon={getIcon()} />;
}

function getIcon() {
  return divIcon({
    html: `<img src="/assets/map-pin-add.png" class="h-full w-full" />`,
    iconSize: new Point(MAP_ICON_SIZE, MAP_ICON_SIZE),
    iconAnchor: new Point(MAP_ICON_SIZE / 2, MAP_ICON_SIZE / 2),
    popupAnchor: new Point(0, 0),
    className: "",
  });
}
