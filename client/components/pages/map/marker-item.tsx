"use client";

import { Marker, Popup } from "react-leaflet";
import Link from "next/link";
import Image from "next/image";
import { divIcon, Point } from "leaflet";
import { MAP_ICON_SIZE } from "@/hooks/store/use-map-store";
import type { Marker as MarkerType } from "@prisma/client";

export default function MarkerItem({
  id,
  lat,
  lng,
  name,
  address,
  images,
}: MarkerType) {
  const imageSrc = JSON.parse(images)[0];

  return (
    <Marker position={[lat, lng]} icon={getIcon()}>
      <Popup autoPan={false} maxWidth={280} minWidth={280}>
        <Link
          href={`/map/location/${id}`}
          className="flex flex-col gap-2 !text-black"
        >
          <h3 className="text-base font-bold">{name}</h3>

          <span>{address}</span>

          <div className="relative aspect-video w-full">
            <Image
              src={imageSrc}
              alt={name}
              width={250}
              height={250}
              className="absolute left-0 top-0 h-full w-full object-cover"
            />
          </div>
        </Link>
      </Popup>
    </Marker>
  );
}

function getIcon() {
  return divIcon({
    html: `<img src="/assets/map-pin.png" class="h-full w-full" />`,
    iconSize: new Point(MAP_ICON_SIZE, MAP_ICON_SIZE),
    iconAnchor: new Point(MAP_ICON_SIZE / 2, MAP_ICON_SIZE),
    popupAnchor: new Point(0, -MAP_ICON_SIZE),
    className: "",
  });
}
