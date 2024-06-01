import { getAppTitle } from "@/lib/get-app-title";
import {
  FOLLOWS_PER_PAGE,
  getFollowingsByUsername,
  getFollowingsCountByUsername,
} from "@/services/follow";
import { getUserByUsername } from "@/services/user";
import { getTranslations } from "next-intl/server";
import { authValidation } from "@/lib/auth-validation";
import type { Metadata } from "next";

import NotFound from "@/components/common/not-found";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import User from "@/components/pages/profile/follow/user";
import Pagination from "@/components/common/pagination";

export async function generateMetadata({
  params: { username },
}: {
  params: { username: string };
}): Promise<Metadata> {
  const t = await getTranslations("pages.followings");

  const user = await getUserByUsername(username);

  return {
    title: getAppTitle(
      user ? t("title", { username: user.username }) : t("userNotFound"),
    ),
  };
}

export default async function Followings({
  params: { username },
  searchParams,
}: {
  params: { username: string };
  searchParams?: {
    page?: string;
  };
}) {
  const t = await getTranslations("pages.followings");

  const user = await getUserByUsername(username);

  if (!user) {
    return <NotFound text={t("userNotFound")} />;
  }

  const currentPage = Number(searchParams?.page) || 1;
  const followings = await getFollowingsByUsername(username, currentPage);
  const totalCount = await getFollowingsCountByUsername(username);

  if (!followings.length) {
    return <NotFound text={t("followsNotFound")} />;
  }

  const authUser = await authValidation();

  return (
    <Card className="max-w-lg">
      <CardHeader>
        <CardTitle>{t("title", { username: user.username })}</CardTitle>
      </CardHeader>

      <CardContent className="space-y-1">
        {followings.map((f) => (
          <User key={f.id} user={f} authUser={authUser} />
        ))}
      </CardContent>

      {totalCount > FOLLOWS_PER_PAGE && (
        <CardFooter>
          <Pagination
            currentPage={currentPage}
            totalCount={totalCount}
            pageCount={FOLLOWS_PER_PAGE}
          />
        </CardFooter>
      )}
    </Card>
  );
}
