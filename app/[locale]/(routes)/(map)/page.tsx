import { getAllMarkers } from "@/services/marker";
import { getTranslations } from "next-intl/server";
import { getPageMetadata } from "@/lib/metadata";
import type { Metadata } from "next";

import Map from "@/components/pages/map/map";

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

export default async function MapPage() {
  const markers = await getAllMarkers();

  return (
    <div className="absolute left-0 top-0 h-dvh w-dvw">
      <Map markers={markers} />
    </div>
  );
}
