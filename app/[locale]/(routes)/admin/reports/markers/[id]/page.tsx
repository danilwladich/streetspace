import {
  getMarkerReportsById,
  getMarkerReportsCountById,
  MARKER_REPORTS_PER_PAGE,
} from "@/services/marker-report";
import { getTranslations } from "next-intl/server";
import { columns } from "@/components/pages/admin/reports/markers/columns";
import { Link } from "@/lib/navigation";

import NotFound from "@/components/common/not-found";
import { DataTable } from "@/components/pages/admin/reports/markers/data-table";
import Pagination from "@/components/common/pagination";
import {
  Card,
  CardContent,
  CardHeader,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

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

  const currentPage = Number(searchParams?.page) || 1;
  const reports = await getMarkerReportsById(id, currentPage);
  const totalCount = await getMarkerReportsCountById(id);

  if (!reports) {
    return <NotFound text={t("notFound")} />;
  }

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
        <Link href={`/map/location/${id}`}>
          <Button tabIndex={-1} variant="outline" size="sm">
            {id}
          </Button>
        </Link>
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
