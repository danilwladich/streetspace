"use client";

import { useEffect, useState } from "react";
import { Marker, Popup, useMap } from "react-leaflet";
import { type LatLng, Point, divIcon } from "leaflet";
import { renderToStaticMarkup } from "react-dom/server";
import type { Bounds } from "./map-container";

import UserMarker from "./user-marker";
import { MapPin } from "lucide-react";

export default function Markers({
  defaultPosition,
  defaultBounds,
}: {
  defaultPosition?: LatLng;
  defaultBounds?: Bounds;
}) {
  const [position, setPosition] = useState(defaultPosition);
  const [bounds, setBounds] = useState(defaultBounds);

  const map = useMap();

  useEffect(() => {
    map.locate().on("locationfound", (e) => {
      setPosition(e.latlng);

      const b = e.target.getBounds().toBBoxString().split(",");
      const currentBounds: Bounds = {
        latMin: parseFloat(b[1]),
        latMax: parseFloat(b[3]),
        lngMin: parseFloat(b[0]),
        lngMax: parseFloat(b[2]),
      };
      setBounds(currentBounds);

      localStorage.setItem(
        "mapData",
        JSON.stringify({ position: e.latlng, bounds: currentBounds }),
      );

      if (position && map.getBounds().overlaps(e.bounds)) {
        return;
      }

      map.flyTo(e.latlng, map.getZoom(), { animate: false });
    });

    map.on("moveend", (e) => {
      const b = e.target.getBounds().toBBoxString().split(",");
      const currentBounds: Bounds = {
        latMin: parseFloat(b[1]),
        latMax: parseFloat(b[3]),
        lngMin: parseFloat(b[0]),
        lngMax: parseFloat(b[2]),
      };
      setBounds(currentBounds);
    });

    return () => {
      map.off();
    };
  }, [map]);

  return !!position && <UserMarker position={position} />;
}

const icon = divIcon({
  html: renderToStaticMarkup(<MapPin color="red" className="h-full w-full" />),
  iconSize: new Point(50, 50),
  iconAnchor: new Point(25, 50),
  popupAnchor: new Point(0, -50),
  className: "",
});
