import Info from "./info/info";
import Followers from "./followers";
import Actions from "./actions/actions";
import { getAuthIsFollowingByUsername } from "@/services/follow";
import type { User } from "@prisma/client";

export default async function User({ user }: { user: User }) {
  const { username } = user;

  const isFollowing = await getAuthIsFollowingByUsername(username);

  return (
    <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
      <Info {...user} />

      <div className="flex w-full items-center gap-2">
        <Followers username={username} />

        <Actions {...user} isFollowing={isFollowing} />
      </div>
    </div>
  );
}
