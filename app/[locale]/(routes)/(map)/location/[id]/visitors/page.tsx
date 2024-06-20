import { getAppTitle } from "@/lib/get-app-title";
import { getUserByUsername } from "@/services/user";
import { getTranslations } from "next-intl/server";
import { authValidation } from "@/lib/auth-validation";
import { getMarkerById } from "@/services/marker";
import {
  MARKER_VISITORS_PER_PAGE,
  getMarkerVisitorsById,
  getMarkerVisitorsCount,
} from "@/services/marker-visitor";
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
  params: { id },
}: {
  params: { id: string };
}): Promise<Metadata> {
  const t = await getTranslations("pages.map.location");

  const marker = await getMarkerById(id);

  return {
    title: getAppTitle(marker?.address || t("notFound")),
    openGraph: {
      title: getAppTitle(marker?.address || t("notFound")),
    },
  };
}

export default async function Visitors({
  params: { id },
  searchParams,
}: {
  params: { id: string };
  searchParams?: {
    page?: string;
  };
}) {
  const t = await getTranslations("pages.map.location");

  const marker = await getMarkerById(id);

  if (!marker) {
    return <NotFound text={t("notFound")} />;
  }

  const currentPage = Number(searchParams?.page) || 1;
  const visitors = await getMarkerVisitorsById(id, currentPage);
  const totalCount = await getMarkerVisitorsCount(id);

  if (!visitors.length) {
    return <NotFound text={t("visitors.notFound")} />;
  }

  const authUser = await authValidation();

  return (
    <Card className="max-w-lg">
      <CardHeader>
        <CardTitle>{t("visitors.title")}</CardTitle>

        <CardDescription>{marker.address}</CardDescription>
      </CardHeader>

      <CardContent className="space-y-1">
        {visitors.map((u) => (
          <UserRow key={u.id} user={u} authUser={authUser} />
        ))}
      </CardContent>

      {totalCount > MARKER_VISITORS_PER_PAGE && (
        <CardFooter>
          <Pagination
            currentPage={currentPage}
            totalCount={totalCount}
            pageCount={MARKER_VISITORS_PER_PAGE}
          />
        </CardFooter>
      )}
    </Card>
  );
}
