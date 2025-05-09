import { getMarkerById } from "@/services/marker";
import { getTranslations } from "next-intl/server";
import { getPageMetadata } from "@/lib/metadata";
import { addressToString } from "@/lib/address-helper";
import type { Metadata } from "next";

import NotFound from "@/components/common/not-found";
import Marker from "@/components/pages/map/location/marker";
import Visitors from "@/components/pages/map/location/visitors/visitors";
import Comments from "@/components/pages/map/location/comments/comments";
import EditRate from "@/components/pages/map/location/edit-rate/edit-rate";

export async function generateMetadata({
  params: { locale, id },
}: {
  params: { locale: string; id: string };
}): Promise<Metadata> {
  const t = await getTranslations("pages.map.location");

  const marker = await getMarkerById(id, true);

  if (!marker) {
    return getPageMetadata({
      pageName: t("notFound"),
      robots: false,
    });
  }

  return getPageMetadata({
    path: `/location/${id}`,
    pageName: addressToString(marker.address),
    titleToLower: false,
    description: t("description"),
    image: (marker.images as string[])[0],
    locale,
  });
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

  const marker = await getMarkerById(id, true);

  if (!marker) {
    return <NotFound text={t("notFound")} />;
  }

  return (
    <>
      <Marker {...marker} />

      <EditRate id={id} avg={marker.avgRate} />

      <Visitors id={id} />

      <Comments
        searchParams={searchParams}
        markerId={id}
        address={addressToString(marker.address)}
      />
    </>
  );
}
