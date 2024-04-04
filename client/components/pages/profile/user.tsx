import Info from "./info/info";
import Followers from "./followers";
import Actions from "./actions/actions";
import { getFollowByUsername } from "@/lib/server-actions";
import type { UserType } from "@/types/UserType";

export default async function User({ user }: { user: UserType }) {
  const { id, username, avatar } = user;

  const followId = await getFollowByUsername(username);

  return (
    <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
      <Info id={id} username={username} avatar={avatar} />

      <div className="flex w-full items-center gap-2">
        <Followers username={username} />

        <Actions id={id} username={username} isFollowing={followId !== null} />
      </div>
    </div>
  );
}
