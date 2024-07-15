import { getUsersCount, getUsers } from "@/services/user";
import { MetadataRoute } from "next";
import { getUrl } from "../sitemap";

export async function generateSitemaps() {
  const totalCount = await getUsersCount();
  const sitemapCount = Math.ceil(totalCount / 50000);
  return Array.from({ length: sitemapCount }, (_, i) => ({ id: i }));
}

export default async function sitemap({
  id,
}: {
  id: number;
}): Promise<MetadataRoute.Sitemap> {
  const users = await getUsers(id, 50000);

  return users.map((user) =>
    getUrl(`/profile/${user.username}`, user.updatedAt),
  );
}
