import { getAppTitle } from "@/lib/get-app-title";
import { checkIsFollowingByUsername } from "@/services/follow";
import { getUserByUsername } from "@/services/user";
import { getTranslations } from "next-intl/server";
import { authValidation } from "@/lib/auth-validation";
import type { Metadata } from "next";

import NotFound from "@/components/common/not-found";
import UserAvatar from "@/components/pages/profile/avatar";
import Actions from "@/components/pages/profile/actions/actions";
import UserFollowers from "@/components/pages/profile/followers";
import UserInfo from "@/components/pages/profile/info";
import { Card, CardContent } from "@/components/ui/card";

export async function generateMetadata({
  params: { username },
}: {
  params: { username: string };
}): Promise<Metadata> {
  const t = await getTranslations("pages.profile");

  const user = await getUserByUsername(username);

  return {
    title: getAppTitle(user?.username || t("notFound")),
  };
}

export default async function Profile({
  params: { username },
}: {
  params: { username: string };
}) {
  const t = await getTranslations("pages.profile");

  const user = await getUserByUsername(username);

  if (!user) {
    return <NotFound text={t("notFound")} />;
  }

  const authUser = await authValidation();
  const isFollowing = authUser
    ? await checkIsFollowingByUsername(authUser.username, username)
    : false;

  return (
    <>
      <Card className="max-w-4xl">
        <CardContent className="relative flex flex-col justify-between gap-4 pt-2 md:flex-row md:pt-0">
          <div className="flex w-full flex-1 flex-col items-center gap-2 md:flex-row md:gap-4">
            <UserAvatar {...user} />

            <div className="flex max-w-full flex-col items-center gap-1 md:items-start">
              <h3 className="max-w-full truncate text-2xl font-semibold">
                {username}
              </h3>

              <div className="flex gap-2">
                <UserFollowers username={username} />
              </div>
            </div>
          </div>

          <div className="absolute right-2 top-2 md:static">
            <Actions {...user} isFollowing={isFollowing} />
          </div>
        </CardContent>
      </Card>

      {!!user.bio && (
        <Card className="max-w-4xl">
          <CardContent>
            <h4 className="text-base font-semibold md:text-lg">
              {t("aboutMe")}
            </h4>
            <p lang="" className="pt-0.5 text-sm">
              {user.bio}
            </p>
          </CardContent>
        </Card>
      )}

      <Card className="max-w-4xl">
        <CardContent className="flex flex-wrap justify-center gap-4 [&>*]:w-full [&>*]:max-w-[calc(50%-1rem)] md:[&>*]:max-w-[calc(33.333%-1rem)]">
          <UserInfo {...user} />
        </CardContent>
      </Card>
    </>
  );
}
