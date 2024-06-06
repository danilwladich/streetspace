"use client";

import { useEffect, useState } from "react";
import { Marker, Popup, useMap } from "react-leaflet";
import { Link } from "@/lib/navigation";
import { MAP_ICON_SIZE } from "@/hooks/store/use-map-store";
import { Point, divIcon, type LatLng } from "leaflet";
import { useTranslations } from "next-intl";
import type { Url } from "next/dist/shared/lib/router/router";

export default function MarkerInput() {
  const t = useTranslations("pages.map");

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

  const href: Url = {
    pathname: "/adding",
    query: {
      lat: position.lat,
      lng: position.lng,
    },
  };

  return (
    <Marker position={position} icon={getIcon()}>
      <Popup autoPan={false} maxWidth={320}>
        <div className="px-4 py-1">
          <Link href={href} className="group relative !text-black">
            {t("input")}

            <div className="absolute bottom-0 left-0 h-[1px] w-full bg-current opacity-0 transition-opacity group-hover:opacity-100" />
          </Link>
        </div>
      </Popup>
    </Marker>
  );
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
