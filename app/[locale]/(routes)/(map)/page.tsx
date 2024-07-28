import dynamic from "next/dynamic";
import { getTranslations } from "next-intl/server";
import { useMemo } from "react";
import { getPageMetadata } from "@/lib/metadata";
import type { Metadata } from "next";

import { AppLoader } from "@/components/ui/app-loader";

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const t = await getTranslations("pages.map");

  return getPageMetadata({
    path: "/",
    pageName: t("title"),
    description: t("description"),
    locale,
  });
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
