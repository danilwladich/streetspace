"use client";

import { useState } from "react";
import ReactDOMServer from "react-dom/server";
import { Marker as LMarker, Popup } from "react-leaflet";
import { Link } from "@/lib/navigation";
import Image from "next/image";
import { divIcon, Point } from "leaflet";
import { MAP_ICON_SIZE } from "@/hooks/store/use-map-store";
import type { ConfirmedMarker } from "@/types/marker";

import { MapPin } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

export default function Marker({
  id,
  lat,
  lng,
  address,
  images,
}: ConfirmedMarker) {
  const [isLoaded, setIsLoaded] = useState(false);

  const imageSrc = JSON.parse(images)[0];

  return (
    <LMarker position={[lat, lng]} icon={getIcon()} zIndexOffset={1}>
      <Popup autoPan={false} maxWidth={300} minWidth={300}>
        <Link
          href={`/location/${id}`}
          className="block space-y-1 !text-current"
        >
          <div className="relative aspect-video w-full overflow-hidden rounded-md">
            {!isLoaded && <Skeleton className="h-full w-full" />}

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
    </LMarker>
  );
}

function getIcon() {
  return divIcon({
    html: ReactDOMServer.renderToString(
      <MapPin strokeWidth={1} className="!h-full !w-full fill-red-400" />,
    ),
    iconSize: new Point(MAP_ICON_SIZE, MAP_ICON_SIZE),
    iconAnchor: new Point(MAP_ICON_SIZE / 2, MAP_ICON_SIZE),
    popupAnchor: new Point(0, -MAP_ICON_SIZE),
    className: "",
  });
}
