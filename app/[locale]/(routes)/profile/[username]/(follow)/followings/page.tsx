import { getAppTitle } from "@/lib/get-app-title";
import {
  FOLLOWS_PER_PAGE,
  getFollowingsByUsername,
  getFollowingsCountByUsername,
} from "@/services/follow";
import { getUserByUsername } from "@/services/user";
import { getTranslations } from "next-intl/server";
import { authValidation } from "@/lib/auth-validation";
import { Link } from "@/lib/navigation";
import { getOpenGraphImages } from "@/lib/opengraph";
import type { Metadata } from "next";

import NotFound from "@/components/common/not-found";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import UserRow from "@/components/common/user/user-row";
import Pagination from "@/components/common/pagination";

export async function generateMetadata({
  params: { username },
}: {
  params: { username: string };
}): Promise<Metadata> {
  const t = await getTranslations("pages.followings");

  const user = await getUserByUsername(username);

  if (!user) {
    return {
      title: getAppTitle(t("userNotFound")),
      robots: { index: false, follow: false },
    };
  }

  const title = getAppTitle(t("title"));
  const description = t("description");
  const images = getOpenGraphImages(username, user.avatar);

  return {
    title,
    description,
    openGraph: {
      title,
      images,
      description,
    },
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

  const authUser = await authValidation();

  return (
    <Card className="max-w-lg">
      <CardHeader>
        <CardTitle>
          <h1>{t("title")}</h1>
        </CardTitle>

        <CardDescription>
          <Link href={`/profile/${user.username}`}>{user.username}</Link>
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-1">
        {followings.map((f) => (
          <UserRow key={f.id} user={f} authUser={authUser} />
        ))}

        {!followings.length && (
          <p className="text-center text-muted-foreground">
            {t("followsNotFound")}
          </p>
        )}
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
