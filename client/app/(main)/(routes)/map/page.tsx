import dynamic from "next/dynamic";
import { useMemo } from "react";

import { AppLoader } from "@/components/ui/app-loader";

export default function Map() {
  const MapComponent = useMemo(
    () =>
      dynamic(() => import("@/components/pages/map/map-container"), {
        loading: () => <AppLoader />,
        ssr: false,
      }),
    [],
  );

  return <MapComponent />;
}
