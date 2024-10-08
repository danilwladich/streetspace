import { getTranslations } from "next-intl/server";
import {
  USER_MARKERS_VISITS_PER_PAGE,
  getUserMarkersVisits,
  getUserMarkersVisitsCount,
} from "@/services/marker-visitor";
import { getUserProfile } from "@/services/user";
import { Link } from "@/lib/navigation";
import { getPageMetadata } from "@/lib/metadata";
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
import VisitMarker from "@/components/pages/profile/visits/visit-marker";
import Pagination from "@/components/common/pagination";

export async function generateMetadata({
  params: { locale, username },
}: {
  params: { locale: string; username: string };
}): Promise<Metadata> {
  const t = await getTranslations("pages.profile");

  const user = await getUserProfile(username);

  if (!user) {
    return getPageMetadata({
      pageName: t("notFound"),
      robots: false,
    });
  }

  return getPageMetadata({
    path: `/profile/${username}/visits`,
    pageName: t("visits.title"),
    description: t("visits.description", { username: user.username }),
    image: user.avatar,
    locale,
  });
}

export default async function Visits({
  params: { username },
  searchParams,
}: {
  params: { username: string };
  searchParams?: {
    page?: string;
  };
}) {
  const t = await getTranslations("pages.profile");

  const user = await getUserProfile(username);

  if (!user) {
    return <NotFound text={t("notFound")} />;
  }

  const currentPage = Number(searchParams?.page) || 1;
  const visits = await getUserMarkersVisits(user.id, currentPage);
  const totalCount = await getUserMarkersVisitsCount(user.id);

  return (
    <Card className="max-w-4xl">
      <CardHeader>
        <CardTitle>
          <h1>{t("visits.title")}</h1>
        </CardTitle>

        <CardDescription>
          <Link href={`/profile/${user.username}`}>{user.username}</Link>
        </CardDescription>
      </CardHeader>

      <CardContent>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
          {visits.map((m) => (
            <VisitMarker key={m.id} {...m} priorityImg />
          ))}
        </div>

        {!visits.length && (
          <p className="text-center text-muted-foreground">
            {t("visits.noVisits")}
          </p>
        )}
      </CardContent>

      {totalCount > USER_MARKERS_VISITS_PER_PAGE && (
        <CardFooter>
          <Pagination
            currentPage={currentPage}
            totalCount={totalCount}
            pageCount={USER_MARKERS_VISITS_PER_PAGE}
          />
        </CardFooter>
      )}
    </Card>
  );
}
