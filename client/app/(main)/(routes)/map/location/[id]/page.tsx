import { getAppTitle } from "@/lib/get-app-title";
import { getMarkerById } from "@/lib/server-actions";
import type { Metadata } from "next";

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
    return (
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform">
        <h2 className="text-center text-xl">Location not found</h2>
      </div>
    );
  }

  return <Marker {...marker} />;
}
