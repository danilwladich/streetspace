"use client";

import { useMemo } from "react";
import { Marker, Popup, useMap } from "react-leaflet";
import Link from "next/link";
import { getImageUrl } from "@/lib/get-image-url";
import type { MarkerType } from "@/types/MarkerType";
import type { LeafletEventHandlerFnMap } from "leaflet";

import { MapMarkerIcon } from "@/components/common/map-marker-icon";

export default function MarkerItem({
  id,
  lat,
  lng,
  name,
  address,
  images,
}: MarkerType) {
  const map = useMap();

  const eventHandlers: LeafletEventHandlerFnMap = useMemo(
    () => ({
      click() {
        const zoom = map.getZoom();

        if (zoom > 15) {
          map.flyTo([lat, lng], zoom, { duration: 0.5 });
          return;
        }

        map.flyTo([lat, lng], 15, { duration: 0.5 });
      },
    }),
    [map],
  );

  const icon = MapMarkerIcon();

  const imageSrc = getImageUrl(images[0], "small");

  return (
    <Marker position={[lat, lng]} icon={icon} eventHandlers={eventHandlers}>
      <Popup autoPan={false} maxWidth={280} minWidth={280}>
        <Link
          href={`/map/location/${id}`}
          className="flex flex-col gap-2 !text-black"
        >
          <h3 className="text-base font-bold">{name}</h3>

          <span>{address}</span>

          <div className="relative h-0 w-full pb-[56%]">
            <img
              src={imageSrc}
              alt={name}
              className="absolute left-0 top-0 h-full w-full object-cover"
            />
          </div>
        </Link>
      </Popup>
    </Marker>
  );
}
