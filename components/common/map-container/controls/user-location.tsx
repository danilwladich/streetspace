"use client";

import { useCallback } from "react";
import { useMapStore } from "@/hooks/store/use-map-store";
import { useTranslations } from "next-intl";
import type { Map } from "leaflet";

import { Button } from "@/components/ui/button";
import { Navigation, NavigationOff } from "lucide-react";

export default function UserLocation({ map }: { map: Map }) {
  const t = useTranslations("pages.map.controls");

  const { userPosition } = useMapStore();

  const locationOnClick = useCallback(() => {
    if (!userPosition) {
      return;
    }

    map.flyTo(userPosition, 16, { animate: true });
  }, [map, userPosition]);

  return (
    <Button variant="outline" size="icon" onClick={locationOnClick}>
      {userPosition ? (
        <Navigation className="h-4 w-4" />
      ) : (
        <NavigationOff className="h-4 w-4" />
      )}

      {userPosition ? (
        <span className="sr-only">{t("locate")}</span>
      ) : (
        <span className="sr-only">{t("noLocation")}</span>
      )}
    </Button>
  );
}
