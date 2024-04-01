import UserInfo from "./user-info";
import UserFollowers from "./user-followers";
import UserActions from "./actions/actions";
import type { UserType } from "@/types/UserType";
import type { FollowType } from "@/types/FollowType";

export default function User({
  user,
  followers,
  followings,
}: {
  user: UserType;
  followers: FollowType;
  followings: FollowType;
}) {
  const { id, username, avatar } = user;
  const avatarUrl = avatar?.formats.thumbnail.url;

  return (
    <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
      <UserInfo username={username} avatarUrl={avatarUrl} />

      <div className="flex w-full items-center gap-2">
        <UserFollowers
          username={username}
          followers={followers}
          followings={followings}
        />

        <UserActions id={id} username={username} followers={followers} />
      </div>
    </div>
  );
}
