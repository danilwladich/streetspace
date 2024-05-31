import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { getUnconfirmedMarkersCount } from "@/services/marker";
import { getReportedMarkersCount } from "@/services/marker-report";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Map, Flag } from "lucide-react";

export default async function Admin() {
  const t = await getTranslations("pages.admin");

  const unconfirmedMarkersCount = await getUnconfirmedMarkersCount();
  const reportedMarkersCount = await getReportedMarkersCount();

  return (
    <Card className="max-w-md">
      <CardHeader>
        <CardTitle>{t("title")}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2 [&>*]:block">
        <Link href="/admin/markers">
          <Button variant="outline" size="sm" className="w-full gap-2">
            <Map className="h-4 w-4" />
            <span>{t("markers.title")}</span>
            <div className="flex-1" />
            <span className="text-muted-foreground">
              {unconfirmedMarkersCount}
            </span>
          </Button>
        </Link>

        <Link href="/admin/reports/markers">
          <Button variant="outline" size="sm" className="w-full gap-2">
            <Flag className="h-4 w-4" />
            <span>{t("reports.markers.title")}</span>
            <div className="flex-1" />
            <span className="text-muted-foreground">
              {reportedMarkersCount}
            </span>
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
}
