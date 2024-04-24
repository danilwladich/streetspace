import {
  getFollowersCountByUsername,
  getFollowingsCountByUsername,
} from "@/services/follow";

import { Dot } from "lucide-react";

export default async function UserFollowers({
  username,
}: {
  username: string;
}) {
  const followersCount = await getFollowersCountByUsername(username);
  const followingsCount = await getFollowingsCountByUsername(username);

  return (
    <>
      <div className="flex items-center gap-1 text-sm opacity-70">
        <span className="font-semibold">{followersCount}</span>
        <span>followers</span>

        <Dot className="h-4 w-4" />
        
        <span className="font-semibold">{followingsCount}</span>
        <span>followings</span>
      </div>
    </>
  );
}
