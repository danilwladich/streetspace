"use client";

import { useState } from "react";
import ReactDOMServer from "react-dom/server";
import { Marker, Popup } from "react-leaflet";
import { Link } from "@/lib/navigation";
import Image from "next/image";
import { divIcon, Point } from "leaflet";
import { MAP_ICON_SIZE } from "@/hooks/store/use-map-store";
import type { Marker as MarkerType } from "@prisma/client";

import { LoaderCircle, MapPin } from "lucide-react";

export default function MapItem({ id, lat, lng, address, images }: MarkerType) {
  const [isLoaded, setIsLoaded] = useState(false);

  const imageSrc = JSON.parse(images)[0];

  return (
    <Marker position={[lat, lng]} icon={getIcon()}>
      <Popup autoPan={false} maxWidth={300} minWidth={300}>
        <Link
          href={`/location/${id}`}
          className="block space-y-1 !text-black dark:!text-white"
        >
          <div className="relative aspect-video w-full overflow-hidden rounded-md">
            {!isLoaded && (
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                <LoaderCircle className="h-8 w-8 animate-spin opacity-70" />
              </div>
            )}

            <Image
              src={imageSrc}
              alt={address}
              width={270}
              height={270}
              onLoad={() => setIsLoaded(true)}
              className="absolute left-0 top-0 h-full w-full rounded object-cover"
            />
          </div>

          <h4 className="text-xs font-semibold">{address}</h4>
        </Link>
      </Popup>
    </Marker>
  );
}

function getIcon() {
  return divIcon({
    html: ReactDOMServer.renderToString(
      <MapPin
        strokeWidth={1}
        className="!h-full !w-full fill-red-400"
      />,
    ),
    iconSize: new Point(MAP_ICON_SIZE, MAP_ICON_SIZE),
    iconAnchor: new Point(MAP_ICON_SIZE / 2, MAP_ICON_SIZE),
    popupAnchor: new Point(0, -MAP_ICON_SIZE),
    className: "",
  });
}
