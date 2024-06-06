import { getAppTitle } from "@/lib/get-app-title";
import dynamic from "next/dynamic";
import { getTranslations } from "next-intl/server";
import { useMemo } from "react";
import type { Metadata } from "next";

import { AppLoader } from "@/components/ui/app-loader";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("pages.map");

  return {
    title: getAppTitle(t("title")),
  };
}

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
    <div className="absolute left-0 top-0 h-dvh w-dvw">
      <MapContainer />
    </div>
  );
}
