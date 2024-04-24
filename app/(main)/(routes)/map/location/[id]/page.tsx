import { getAppTitle } from "@/lib/get-app-title";
import { getMarkerById } from "@/services/marker";
import type { Metadata } from "next";

import NotFound from "@/components/common/not-found";
import { Marker } from "@/components/pages/map/location/marker";

export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  const marker = await getMarkerById(params.id);

  return {
    title: getAppTitle(marker?.name || "Location not found"),
  };
}

export default async function Location({ params }: { params: { id: string } }) {
  const marker = await getMarkerById(params.id);

  if (!marker) {
    return <NotFound text="Location not found" />;
  }

  return <Marker {...marker} />;
}

// TODO: Add a loading skeleton
