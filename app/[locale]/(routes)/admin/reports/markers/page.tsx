import { Link } from "@/lib/navigation";
import { getTranslations } from "next-intl/server";
import {
  getReportedMarkers,
  getReportedMarkersCount,
  REPORTED_MARKERS_PER_PAGE,
} from "@/services/marker-report";

import NotFound from "@/components/common/not-found";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Pagination from "@/components/common/pagination";

export default async function ReportedMarkers({
  searchParams,
}: {
  searchParams?: {
    page?: string;
  };
}) {
  const t = await getTranslations("pages.admin.reports.markers");

  const currentPage = Number(searchParams?.page) || 1;
  const markers = await getReportedMarkers(currentPage);
  const totalCount = await getReportedMarkersCount();

  if (!markers.length) {
    return <NotFound text={t("notFound")} />;
  }

  return (
    <Card className="max-w-md">
      <CardHeader>
        <CardTitle>{t("title")}</CardTitle>
      </CardHeader>

      <CardContent className="space-y-2">
        {markers.map((m) => (
          <Link
            key={m.id}
            href={`/admin/reports/markers/${m.id}`}
            className="block"
          >
            <Button
              variant="outline"
              size="sm"
              className="w-full justify-between gap-2"
            >
              <span className="truncate">{m.address}</span>
              <span className="text-muted-foreground">{m._count.reports}</span>
            </Button>
          </Link>
        ))}
      </CardContent>

      {totalCount > REPORTED_MARKERS_PER_PAGE && (
        <CardFooter>
          <Pagination
            currentPage={currentPage}
            totalCount={totalCount}
            pageCount={REPORTED_MARKERS_PER_PAGE}
          />
        </CardFooter>
      )}
    </Card>
  );
}
