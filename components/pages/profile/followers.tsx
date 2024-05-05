import {
  getFollowersCountByUsername,
  getFollowingsCountByUsername,
} from "@/services/follow";
import { getTranslations } from "next-intl/server";

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
      <div className="flex items-center gap-1 text-xs opacity-70 md:text-sm">
        <span className="font-semibold">{followersCount}</span>
        <span>{t("followers")}</span>

        <Dot className="h-4 w-4" />

        <span className="font-semibold">{followingsCount}</span>
        <span>{t("followings")}</span>
      </div>
    </>
  );
}
