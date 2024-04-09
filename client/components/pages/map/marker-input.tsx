"use client";

import { useEffect, useState } from "react";
import { Marker, Popup, useMap } from "react-leaflet";
import Link from "next/link";
import type { LatLng } from "leaflet";
import type { Url } from "next/dist/shared/lib/router/router";

import { MapMarkerIcon } from "@/components/common/map-marker-icon";

export default function MarkerInput() {
  const [position, setPosition] = useState<LatLng>();

  const map = useMap();

  useEffect(() => {
    map.on("dblclick", (e) => {
      setPosition(e.latlng);
    });

    return () => {
      map.off();
    };
  }, [map]);

  if (!position) {
    return null;
  }

  const icon = MapMarkerIcon("blue", "white");

  const href: Url = {
    pathname: "/map/adding",
    query: {
      lat: position.lat,
      lng: position.lng,
    },
  };

  return (
    <Marker position={position} icon={icon}>
      <Popup autoPan={false} maxWidth={320}>
        <Link href={href}>Create new location</Link>
      </Popup>
    </Marker>
  );
}
