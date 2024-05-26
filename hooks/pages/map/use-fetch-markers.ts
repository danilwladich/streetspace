import axios, { AxiosError } from "axios";
import { useCallback } from "react";
import { useTranslations } from "next-intl";
import { toast } from "sonner";
import { useMapStore } from "@/hooks/store/use-map-store";
import type { Marker } from "@prisma/client";

export function useFetchMarkers() {
  const t = useTranslations("pages.map.markers");

  const { bounds, setMarkers, setLoadingMarkers, setSearchIsVisible } =
    useMapStore();

  const fetchMarkers = useCallback(async () => {
    if (!bounds) {
      return;
    }

    setLoadingMarkers(true);

    try {
      const { data } = await axios.get<Marker[]>(`/api/map`, {
        params: bounds,
      });

      setMarkers(data);

      setSearchIsVisible(false);
    } catch (e: unknown) {
      // Handling AxiosError
      const error = e as AxiosError;

      toast.error(t("fetchError"), { description: error.message });
    }

    setLoadingMarkers(false);
  }, [t, bounds, setLoadingMarkers, setSearchIsVisible]);

  return { fetchMarkers };
}
