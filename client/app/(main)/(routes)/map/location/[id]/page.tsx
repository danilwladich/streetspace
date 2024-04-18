import { getAppTitle } from "@/lib/get-app-title";
import type { Metadata } from "next";

import NotFound from "@/components/common/not-found";
import { Marker } from "@/components/pages/map/location/marker";

export async function generateMetadata({
  params,
}: {
  params: { id: number };
}): Promise<Metadata> {
  const marker = await getMarkerById(params.id);

  return {
    title: getAppTitle(marker?.name || "Location not found"),
  };
}

export default async function Location({ params }: { params: { id: number } }) {
  const marker = await getMarkerById(params.id);

  if (!marker) {
    return <NotFound text="Location not found" />;
  }

  return <Marker {...marker} />;
}
