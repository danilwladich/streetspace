import { getMarkers, getMarkersCount } from "@/services/marker";
import { MetadataRoute } from "next";
import { getUrl } from "../sitemap";

export async function generateSitemaps() {
  const totalCount = await getMarkersCount();
  const sitemapCount = Math.ceil(totalCount / 50000);
  return Array.from({ length: sitemapCount }, (_, i) => ({ id: i }));
}

export default async function sitemap({
  id,
}: {
  id: number;
}): Promise<MetadataRoute.Sitemap> {
  const markers = await getMarkers(id, 50000);

  return markers.map((marker) =>
    getUrl(`/location/${marker.id}`, marker.updatedAt),
  );
}
