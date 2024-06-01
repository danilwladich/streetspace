import {
  getFollowersCountByUsername,
  getFollowingsCountByUsername,
} from "@/services/follow";
import { getTranslations } from "next-intl/server";
import { Link } from "@/lib/navigation";

import { Dot } from "lucide-react";

export default async function UserFollowers({
  username,
}: {
  username: string;
}) {
  const t = await getTranslations("pages.profile");

  const followersCount = await getFollowersCountByUsername(username);
  const followingsCount = await getFollowingsCountByUsername(username);

  return (
    <>
      <div className="flex items-center gap-1 text-xs text-muted-foreground md:text-sm">
        <Link href={`/profile/${username}/followers`} className="flex gap-1">
          <span className="font-semibold">{followersCount}</span>
          <span>{t("followers")}</span>
        </Link>

        <Dot className="h-4 w-4" />

        <Link href={`/profile/${username}/followings`} className="flex gap-1">
          <span className="font-semibold">{followingsCount}</span>
          <span>{t("followings")}</span>
        </Link>
      </div>
    </>
  );
}
