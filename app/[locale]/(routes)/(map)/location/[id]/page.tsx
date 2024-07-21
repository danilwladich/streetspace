import { getAppTitle } from "@/lib/get-app-title";
import { getMarkerById } from "@/services/marker";
import { getOpenGraphImages } from "@/lib/opengraph";
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

  if (!marker) {
    return {
      title: getAppTitle(t("notFound")),
      robots: { index: false, follow: false },
    };
  }

  const title = getAppTitle(marker.address, false);
  const images = getOpenGraphImages(
    marker.address,
    JSON.parse(marker.images)[0],
  );

  return {
    title,
    openGraph: {
      title,
      images,
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
