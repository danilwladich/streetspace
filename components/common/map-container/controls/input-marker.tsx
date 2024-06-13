"use client";

import { useMapStore } from "@/hooks/store/use-map-store";
import { Link } from "@/lib/navigation";
import { useTranslations } from "next-intl";
import type { Map } from "leaflet";

import { Button } from "@/components/ui/button";
import { MapPinned, Check, X } from "lucide-react";

export default function InputMarker({ map }: { map: Map }) {
  const t = useTranslations("pages.map.controls");

  const { isInput, setIsInput } = useMapStore();

  if (!isInput) {
    return (
      <Button variant="outline" size="icon" onClick={() => setIsInput(true)}>
        <MapPinned className="h-4 w-4" />
        <span className="sr-only">{t("input")}</span>
      </Button>
    );
  }

  const lat = map.getCenter().lat;
  const lng = map.getCenter().lng;

  return (
    <div className="flex gap-1">
      <Button variant="outline" size="icon" onClick={() => setIsInput(false)}>
        <X className="h-4 w-4" />
        <span className="sr-only">{t("inputCancel")}</span>
      </Button>

      <Link href={`/adding?lat=${lat}&lng=${lng}`}>
        <Button tabIndex={-1} variant="outline" size="icon">
          <Check className="h-4 w-4" />
          <span className="sr-only">{t("inputConfirm")}</span>
        </Button>
      </Link>
    </div>
  );
}
