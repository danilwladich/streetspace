import {
  getUserMarkersVisits,
  getUserMarkersVisitsCount,
} from "@/services/marker-visitor";
import { Link } from "@/lib/navigation";
import { getTranslations } from "next-intl/server";

import VisitMarker from "./visit-marker";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const PER_PAGE = 6;

export default async function Visits({
  userId,
  username,
}: {
  userId: string;
  username: string;
}) {
  const t = await getTranslations("pages.profile.visits");

  const visits = await getUserMarkersVisits(userId, 1, PER_PAGE);

  if (!visits.length) {
    return null;
  }

  const totalCount = await getUserMarkersVisitsCount(userId);

  return (
    <Card className="max-w-4xl">
      <CardHeader>
        <CardTitle>{t("title")}</CardTitle>
      </CardHeader>

      <CardContent className="grid grid-cols-2 gap-2 sm:grid-cols-3">
        {visits.map((m) => (
          <VisitMarker key={m.id} {...m} />
        ))}
      </CardContent>

      {totalCount > PER_PAGE && (
        <CardFooter>
          <Link href={`/profile/${username}/visits`} className="w-full">
            <Button tabIndex={-1} className="w-full">
              {t("showAll", { count: totalCount })}
            </Button>
          </Link>
        </CardFooter>
      )}
    </Card>
  );
}
