import UserInfo from "./user-info";
import UserFollowers from "./user-followers";
import UserActions from "./actions/actions";
import { getFollowByUsername } from "@/lib/server-actions";
import type { UserType } from "@/types/UserType";

export default async function User({ user }: { user: UserType }) {
  const { id, username, avatar } = user;
  const avatarUrl = avatar?.formats.thumbnail.url;

  const followId = await getFollowByUsername(username);

  return (
    <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
      <UserInfo username={username} avatarUrl={avatarUrl} />

      <div className="flex w-full items-center gap-2">
        <UserFollowers username={username} />

        <UserActions
          id={id}
          username={username}
          isFollowing={followId !== null}
        />
      </div>
    </div>
  );
}
