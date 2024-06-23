import { getAppTitle } from "@/lib/get-app-title";
import {
  FOLLOWS_PER_PAGE,
  getFollowersByUsername,
  getFollowersCountByUsername,
} from "@/services/follow";
import { getUserByUsername } from "@/services/user";
import { getTranslations } from "next-intl/server";
import { authValidation } from "@/lib/auth-validation";
import { Link } from "@/lib/navigation";
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
  const t = await getTranslations("pages.followers");

  const user = await getUserByUsername(username);

  const title = getAppTitle(
    user ? t("title", { username: user.username }) : t("userNotFound"),
  );

  return {
    title,
    openGraph: {
      title,
    },
  };
}

export default async function Followers({
  params: { username },
  searchParams,
}: {
  params: { username: string };
  searchParams?: {
    page?: string;
  };
}) {
  const t = await getTranslations("pages.followers");

  const user = await getUserByUsername(username);

  if (!user) {
    return <NotFound text={t("userNotFound")} />;
  }

  const currentPage = Number(searchParams?.page) || 1;
  const followers = await getFollowersByUsername(username, currentPage);
  const totalCount = await getFollowersCountByUsername(username);

  const authUser = await authValidation();

  return (
    <Card className="max-w-lg">
      <CardHeader>
        <CardTitle>{t("title")}</CardTitle>

        <CardDescription>
          <Link href={`/profile/${user.username}`}>{user.username}</Link>
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-1">
        {followers.map((f) => (
          <UserRow key={f.id} user={f} authUser={authUser} />
        ))}

        {!followers.length && (
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
