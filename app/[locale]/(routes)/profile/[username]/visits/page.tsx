import { getAppTitle } from "@/lib/get-app-title";
import { getTranslations } from "next-intl/server";
import {
  USER_MARKERS_VISITS_PER_PAGE,
  getUserMarkersVisits,
  getUserMarkersVisitsCount,
} from "@/services/marker-visitor";
import { getUserByUsername } from "@/services/user";
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
import VisitMarker from "@/components/pages/profile/visits/visit-marker";
import Pagination from "@/components/common/pagination";

export async function generateMetadata({
  params: { username },
}: {
  params: { username: string };
}): Promise<Metadata> {
  const t = await getTranslations("pages.profile");

  const user = await getUserByUsername(username);

  const title = getAppTitle(user ? t("visits.title") : t("notFound"));

  return {
    title,
    openGraph: {
      title,
    },
  };
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

  const user = await getUserByUsername(username);

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
