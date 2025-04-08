import { getMarkerById } from "@/services/marker";
import {
  getMarkerReportsById,
  getMarkerReportsCountById,
  MARKER_REPORTS_PER_PAGE,
} from "@/services/marker-report";
import { Link } from "@/lib/navigation";
import { columns } from "@/components/pages/admin/reports/markers/columns";
import { getTranslations } from "next-intl/server";
import { addressToString } from "@/lib/address-helper";

import NotFound from "@/components/common/not-found";
import { DataTable } from "@/components/pages/admin/reports/markers/data-table";
import Pagination from "@/components/common/pagination";
import {
  Card,
  CardContent,
  CardTitle,
  CardHeader,
  CardFooter,
  CardDescription,
} from "@/components/ui/card";

export default async function MarkerReports({
  params: { id, locale },
  searchParams,
}: {
  params: { id: string; locale: string };
  searchParams?: {
    page?: string;
  };
}) {
  const t = await getTranslations("pages.admin.reports.markers.marker");

  const marker = await getMarkerById(id);

  if (!marker) {
    return <NotFound text={t("notFound")} />;
  }

  const currentPage = Number(searchParams?.page) || 1;
  const reports = await getMarkerReportsById(id, currentPage);
  const totalCount = await getMarkerReportsCountById(id);

  const data = reports.map((r) => ({
    id: r.id,
    type: t(r.type),
    message: r.message || "",
    updatedAt: r.updatedAt.toLocaleDateString(locale, {
      year: "numeric",
      month: "numeric",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
    }),
  }));

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <h1>{t("title")}</h1>
        </CardTitle>

        <CardDescription>
          <Link href={`/location/${id}`}>
            {addressToString(marker.address)}
          </Link>
        </CardDescription>
      </CardHeader>

      <CardContent>
        <DataTable columns={columns} data={data} />
      </CardContent>

      {totalCount > MARKER_REPORTS_PER_PAGE && (
        <CardFooter>
          <Pagination
            currentPage={currentPage}
            totalCount={totalCount}
            pageCount={MARKER_REPORTS_PER_PAGE}
          />
        </CardFooter>
      )}
    </Card>
  );
}
