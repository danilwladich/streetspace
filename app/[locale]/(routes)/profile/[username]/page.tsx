import { getAppTitle } from "@/lib/get-app-title";
import { getAuthIsFollowingByUsername } from "@/services/follow";
import { getUserByUsername } from "@/services/user";
import type { Metadata } from "next";

import NotFound from "@/components/common/not-found";
import UserAvatar from "@/components/pages/profile/avatar";
import Actions from "@/components/pages/profile/actions/actions";
import UserFollowers from "@/components/pages/profile/followers";
import UserInfo from "@/components/pages/profile/info";
import { Card, CardContent } from "@/components/ui/card";

export async function generateMetadata({
  params,
}: {
  params: { username: string };
}): Promise<Metadata> {
  const user = await getUserByUsername(params.username);

  return {
    title: getAppTitle(user?.username),
  };
}

export default async function Profile({
  params,
}: {
  params: { username: string };
}) {
  const { username } = params;

  const user = await getUserByUsername(username);

  if (!user) {
    return <NotFound text="User not found" />;
  }

  const isFollowing = await getAuthIsFollowingByUsername(username);

  return (
    <>
      <Card className="max-w-4xl">
        <CardContent className="relative flex flex-col justify-between gap-4 md:flex-row">
          <div className="flex w-full flex-1 flex-col items-center gap-2 md:flex-row md:gap-4">
            <UserAvatar {...user} />

            <div className="flex max-w-full flex-col items-center gap-1 md:items-start">
              <h2 className="max-w-full truncate text-2xl font-semibold">
                {user.username}
              </h2>

              <div className="flex gap-2">
                <UserFollowers username={username} />
              </div>
            </div>
          </div>

          <div className="absolute right-2 top-0 md:static">
            <Actions {...user} isFollowing={isFollowing} />
          </div>
        </CardContent>
      </Card>

      {!!user.bio && (
        <Card className="max-w-4xl">
          <CardContent className="text-sm">{user.bio}</CardContent>
          {/* TODO: new bio input */}
        </Card>
      )}

      <Card className="max-w-4xl">
        <CardContent className="grid grid-cols-2 gap-4 md:grid-cols-3">
          <UserInfo {...user} />
        </CardContent>
      </Card>
    </>
  );
}
