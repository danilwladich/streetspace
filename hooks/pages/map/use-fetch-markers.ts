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
    try {
      if (!bounds) {
        return;
      }

      // Set loading state
      setLoadingMarkers(true);

      // Fetch markers
      const { data } = await axios.get<Marker[]>("/api/map", {
        params: bounds,
      });

      // Set markers
      setMarkers(data);

      // Unset loading state
      setLoadingMarkers(false);

      // Show search
      setSearchIsVisible(false);
    } catch (e: unknown) {
      // Unset loading state
      setLoadingMarkers(false);

      // Handling AxiosError
      const error = e as AxiosError;

      toast.error(t("fetchError"), { description: error.message });
    }
  }, [t, bounds, setLoadingMarkers, setMarkers, setSearchIsVisible]);

  return { fetchMarkers };
}
