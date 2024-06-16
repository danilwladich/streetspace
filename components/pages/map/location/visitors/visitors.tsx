import {
  getMarkerVisitorsById,
  getMarkerVisitorsCount,
} from "@/services/marker-visitor";
import { Link } from "@/lib/navigation";
import { getTranslations } from "next-intl/server";

import VisitorUser from "./user";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const PER_PAGE = 10;

export default async function Visitors({ id }: { id: string }) {
  const t = await getTranslations("pages.map.location.visitors");

  const visitors = await getMarkerVisitorsById(id, 1, PER_PAGE);

  if (!visitors.length) {
    return null;
  }

  const totalCount = await getMarkerVisitorsCount(id);

  return (
    <Card className="max-w-4xl">
      <CardHeader>
        <CardTitle>{t("title")}</CardTitle>
      </CardHeader>

      <CardContent className="grid grid-cols-5 gap-4 sm:grid-cols-10">
        {visitors.map((f) => (
          <VisitorUser key={f.id} {...f} />
        ))}
      </CardContent>

      {totalCount > PER_PAGE && (
        <CardFooter>
          <Link href={`/location/${id}/visitors`} className="w-full">
            <Button tabIndex={-1} className="w-full">
              {t("showAll", { count: totalCount })}
            </Button>
          </Link>
        </CardFooter>
      )}
    </Card>
  );
}
