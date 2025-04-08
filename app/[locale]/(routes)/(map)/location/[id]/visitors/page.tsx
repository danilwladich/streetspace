import { authValidation } from "@/lib/auth-validation";
import { getMarkerById } from "@/services/marker";
import {
  MARKER_VISITORS_PER_PAGE,
  getMarkerVisitorsById,
  getMarkerVisitorsCount,
} from "@/services/marker-visitor";
import { Link } from "@/lib/navigation";
import { getTranslations } from "next-intl/server";
import { getPageMetadata } from "@/lib/metadata";
import { addressToString } from "@/lib/address-helper";
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
  params: { locale, id },
}: {
  params: { locale: string; id: string };
}): Promise<Metadata> {
  const t = await getTranslations("pages.map.location");

  const marker = await getMarkerById(id, true);

  if (!marker) {
    return getPageMetadata({
      pageName: t("notFound"),
      robots: false,
    });
  }

  return getPageMetadata({
    path: `/location/${id}/visitors`,
    pageName: t("visitors.title"),
    description: t("visitors.description", {
      address: addressToString(marker.address),
    }),
    image: (marker.images as string[])[0],
    locale,
  });
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

  const marker = await getMarkerById(id, true);

  if (!marker) {
    return <NotFound text={t("notFound")} />;
  }

  const currentPage = Number(searchParams?.page) || 1;
  const visitors = await getMarkerVisitorsById(id, currentPage);
  const totalCount = await getMarkerVisitorsCount(id);

  const authUser = await authValidation();

  return (
    <Card className="max-w-lg">
      <CardHeader>
        <CardTitle>
          <h1>{t("visitors.title")}</h1>
        </CardTitle>

        <CardDescription>
          <Link href={`/location/${id}`}>
            {addressToString(marker.address)}
          </Link>
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-1">
        {visitors.map((u) => (
          <UserRow key={u.id} user={u} authUser={authUser} />
        ))}

        {!visitors.length && (
          <p className="text-center text-muted-foreground">
            {t("visitors.noVisitors")}
          </p>
        )}
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
