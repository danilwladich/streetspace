"use client";

import { Marker, Popup } from "react-leaflet";
import { useUserImageSrc } from "@/hooks/use-user-image-src";
import { useAuthStore } from "@/hooks/use-auth-store";
import { type LatLng, Icon, Point } from "leaflet";

const ICON_SIZE = 30;

export default function UserMarker({ position }: { position: LatLng }) {
  const { user } = useAuthStore();
  const avatarUrl = user?.avatar?.formats.thumbnail.url;
  const src = useUserImageSrc(avatarUrl);

  const icon = new Icon({
    iconUrl: src,
    iconRetinaUrl: src,
    iconSize: new Point(ICON_SIZE, ICON_SIZE),
    iconAnchor: new Point(ICON_SIZE / 2, ICON_SIZE / 2),
    popupAnchor: new Point(0, -(ICON_SIZE / 2)),
    className: "object-cover rounded-full",
  });

  return (
    <Marker position={position} icon={icon}>
      <Popup>You are here</Popup>
    </Marker>
  );
}
