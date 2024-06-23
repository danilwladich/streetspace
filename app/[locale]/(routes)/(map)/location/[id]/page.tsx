import { getAppTitle } from "@/lib/get-app-title";
import { getMarkerById } from "@/services/marker";
import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";

import NotFound from "@/components/common/not-found";
import Marker from "@/components/pages/map/location/marker";
import Visitors from "@/components/pages/map/location/visitors/visitors";
import Comments from "@/components/pages/map/location/comments/comments";

export async function generateMetadata({
  params: { id },
}: {
  params: { id: string };
}): Promise<Metadata> {
  const t = await getTranslations("pages.map.location");

  const marker = await getMarkerById(id);

  const title = getAppTitle(marker?.address || t("notFound"), false);

  return {
    title,
    openGraph: {
      title,
    },
  };
}

export default async function Location({
  params: { id },
  searchParams,
}: {
  params: { id: string };
  searchParams?: {
    page?: string;
  };
}) {
  const t = await getTranslations("pages.map.location");

  const marker = await getMarkerById(id);

  if (!marker) {
    return <NotFound text={t("notFound")} />;
  }

  return (
    <>
      <Marker {...marker} />

      <Visitors id={id} />

      <Comments
        searchParams={searchParams}
        markerId={id}
        address={marker.address}
      />
    </>
  );
}
