"use client";

import { useTranslations } from "next-intl";
import type { Map } from "leaflet";

import { Button } from "@/components/ui/button";
import { ZoomIn, ZoomOut } from "lucide-react";

export default function ZoomControls({ map }: { map: Map }) {
  const t = useTranslations("pages.map.controls");

  return (
    <>
      <Button
        variant="outline"
        size="icon"
        onClick={() => map.zoomIn()}
        disabled={map.getMaxZoom() === map.getZoom()}
      >
        <ZoomIn className="h-4 w-4" />
        <span className="sr-only">{t("zoomIn")}</span>
      </Button>

      <Button
        variant="outline"
        size="icon"
        onClick={() => map.zoomOut()}
        disabled={map.getMinZoom() === map.getZoom()}
      >
        <ZoomOut className="h-4 w-4" />
        <span className="sr-only">{t("zoomOut")}</span>
      </Button>
    </>
  );
}
