"use client";

import { useMapStore } from "@/hooks/store/use-map-store";
import { useTranslations } from "next-intl";
import { useFetchMarkers } from "@/hooks/pages/map/use-fetch-markers";

import { Button } from "@/components/ui/button";
import { Search, LoaderCircle } from "lucide-react";

export default function FetchMarkers() {
  const t = useTranslations("pages.map.markers");

  const { searchIsVisible, loadingMarkers } = useMapStore();
  const { fetchMarkers } = useFetchMarkers();

  if (!searchIsVisible) {
    return null;
  }

  return (
    <div className="absolute bottom-12 left-1/2 -translate-x-1/2 md:bottom-2">
      <Button variant="outline" className="gap-2" onClick={fetchMarkers}>
        {loadingMarkers ? (
          <LoaderCircle className="h-4 w-4 animate-spin" />
        ) : (
          <Search className="h-4 w-4" />
        )}
        <span>{t("search")}</span>
      </Button>
    </div>
  );
}
