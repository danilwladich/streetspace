import type { Metadata } from "next";
import { getAppTitle } from "@/lib/get-app-title";
import dynamic from "next/dynamic";
import { useMemo } from "react";

import { AppLoader } from "@/components/ui/app-loader";

export const metadata: Metadata = {
  title: getAppTitle("workout map"),
};

export default function Map() {
  const MapContainer = useMemo(
    () =>
      dynamic(() => import("@/components/pages/map/map-container"), {
        loading: () => <AppLoader />,
        ssr: false,
      }),
    [],
  );

  return (
    <div>
      <MapContainer />
    </div>
  );
}
