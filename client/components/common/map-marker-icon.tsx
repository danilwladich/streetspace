import { Point, divIcon } from "leaflet";
import { renderToStaticMarkup } from "react-dom/server";
import { MAP_ICON_SIZE } from "@/hooks/store/use-map-store";

import { MapPin } from "lucide-react";

export function MapMarkerIcon(color: string = "black", fill: string = "white") {
  return divIcon({
    html: renderToStaticMarkup(
      <MapPin color={color} fill={fill} className="h-full w-full" />,
    ),
    iconSize: new Point(MAP_ICON_SIZE, MAP_ICON_SIZE),
    iconAnchor: new Point(MAP_ICON_SIZE / 2, MAP_ICON_SIZE),
    popupAnchor: new Point(0, -MAP_ICON_SIZE),
    className: "",
  });
}
