import {
  UNCONFIRMED_MARKERS_PER_PAGE,
  getUnconfirmedMarkers,
  getUnconfirmedMarkersCount,
} from "@/services/marker";
import { getTranslations } from "next-intl/server";

import NotFound from "@/components/common/not-found";
import { Marker } from "@/components/pages/admin/markers/marker";
import { Card, CardContent } from "@/components/ui/card";
import Pagination from "@/components/common/pagination";

export default async function Markers({
  searchParams,
}: {
  searchParams?: {
    page?: string;
  };
}) {
  const t = await getTranslations("pages.admin.markers");

  const currentPage = Number(searchParams?.page) || 1;
  const markers = await getUnconfirmedMarkers(currentPage);
  const totalCount = await getUnconfirmedMarkersCount();

  if (!markers.length) {
    return <NotFound text={t("notFound")} />;
  }

  return (
    <>
      {markers.map((m) => (
        <Marker key={m.id} {...m} />
      ))}

      {totalCount > UNCONFIRMED_MARKERS_PER_PAGE && (
        <Card className="max-w-4xl">
          <CardContent>
            <Pagination
              currentPage={currentPage}
              totalCount={totalCount}
              pageCount={UNCONFIRMED_MARKERS_PER_PAGE}
            />
          </CardContent>
        </Card>
      )}
    </>
  );
}
