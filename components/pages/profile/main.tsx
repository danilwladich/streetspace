import { checkIsFollowingById } from "@/services/follow";
import { authValidation } from "@/lib/auth-validation";
import type { UserProfile } from "@/types/user";

import UserAvatar from "./avatar";
import UserFollowers from "./followers";
import UserActions from "@/components/common/user/actions/actions";
import { Card, CardContent } from "@/components/ui/card";

export default async function ProfileMain(user: UserProfile) {
  const authUser = await authValidation();
  const isFollowing = authUser
    ? await checkIsFollowingById(authUser.id, user.id)
    : false;

  return (
    <Card className="max-w-4xl">
      <CardContent className="relative flex flex-col justify-between gap-4 pt-2 md:flex-row md:pt-0">
        <div className="flex w-full flex-1 flex-col items-center gap-2 md:flex-row md:gap-4">
          <UserAvatar {...user} />

          <div className="flex max-w-full flex-col items-center gap-1 md:items-start">
            <h1 className="max-w-full truncate text-2xl font-semibold">
              {user.username}
            </h1>

            <div className="flex gap-2">
              <UserFollowers username={user.username} />
            </div>
          </div>
        </div>

        <div className="absolute right-2 top-2 md:static">
          <UserActions {...user} isFollowing={isFollowing} />
        </div>
      </CardContent>
    </Card>
  );
}
