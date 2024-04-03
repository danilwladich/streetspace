"use client";

import { Marker, Popup } from "react-leaflet";
import { useUserImageSrc } from "@/hooks/use-user-image-src";
import { useAuthStore } from "@/hooks/use-auth-store";
import { type LatLng, Icon, Point } from "leaflet";

export default function UserMarker({ position }: { position: LatLng }) {
  const { user } = useAuthStore();
  const avatarUrl = user?.avatar?.formats.thumbnail.url;
  const src = useUserImageSrc(avatarUrl);

  const icon = new Icon({
    iconUrl: src,
    iconRetinaUrl: src,
    iconSize: new Point(50, 50),
    iconAnchor: new Point(25, 25),
    popupAnchor: new Point(0, -25),
    className: "object-contain rounded-full",
  });

  return (
    <Marker position={position} icon={icon}>
      <Popup>You are here</Popup>
    </Marker>
  );
}
