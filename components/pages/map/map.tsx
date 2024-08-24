import dynamic from "next/dynamic";
import { useMemo } from "react";
import type { ConfirmedMarker } from "@/types/marker";

import { AppLoader } from "@/components/ui/app-loader";

export default function Map({ markers }: { markers: ConfirmedMarker[] }) {
  const MapContainer = useMemo(
    () =>
      dynamic(() => import("@/components/pages/map/map-container"), {
        loading: () => <AppLoader />,
        ssr: false,
      }),
    [],
  );

  return <MapContainer markers={markers} />;
}
