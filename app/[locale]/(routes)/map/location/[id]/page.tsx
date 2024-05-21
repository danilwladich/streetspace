import { getAppTitle } from "@/lib/get-app-title";
import {
  checkAuthIsFavoriteMarker,
  getMarkerById,
  getMarkerFavoritesCount,
} from "@/services/marker";
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

export default async function Location({
  params: { id },
}: {
  params: { id: string };
}) {
  const t = await getTranslations("pages.map.location");

  const marker = await getMarkerById(id);

  if (!marker) {
    return <NotFound text={t("notFound")} />;
  }

  const isFavorite = await checkAuthIsFavoriteMarker(id);
  const favoritesCount = await getMarkerFavoritesCount(id);

  return (
    <Marker
      {...marker}
      isFavorite={isFavorite}
      favoritesCount={favoritesCount}
    />
  );
}
