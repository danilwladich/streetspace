import { getAppTitle } from "@/lib/get-app-title";
import { getMarkerById } from "@/services/marker";
import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";

import NotFound from "@/components/common/not-found";
import { Marker } from "@/components/pages/map/location/marker";

export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  const t = await getTranslations("pages.map.location");

  const marker = await getMarkerById(params.id);

  return {
    title: getAppTitle(marker?.address || t("notFound")),
  };
}

export default async function Location({ params }: { params: { id: string } }) {
  const t = await getTranslations("pages.map.location");

  const marker = await getMarkerById(params.id);

  if (!marker) {
    return <NotFound text={t("notFound")} />;
  }

  return <Marker {...marker} />;
}
