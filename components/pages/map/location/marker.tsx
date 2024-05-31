import { Link } from "@/lib/navigation";
import dynamic from "next/dynamic";
import { useMemo } from "react";
import { useTranslations } from "next-intl";
import type { Prisma } from "@prisma/client";

import MarkerImages from "@/components/common/marker/marker-images";
import Actions from "./actions/actions";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { User, Compass, Star } from "lucide-react";
import { DateToShow } from "@/components/common/date-to-show";
import { Skeleton } from "@/components/ui/skeleton";

type MarkerType = Prisma.MarkerGetPayload<{
  include: { addedBy: true };
}>;

export function Marker({
  id,
  address,
  lat,
  lng,
  images,
  addedBy,
  createdAt,
  isFavorite,
  favoritesCount,
}: MarkerType & { isFavorite: boolean; favoritesCount: number }) {
  const t = useTranslations("pages.map.location");

  const MapContainer = useMemo(
    () =>
      dynamic(
        () => import("@/components/common/map-container/map-single-marker"),
        {
          loading: () => <Skeleton className="h-full w-full" />,
          ssr: false,
        },
      ),
    [],
  );

  return (
    <Card className="max-w-4xl">
      <CardHeader>
        <div className="relative">
          <CardTitle className="pr-14">{address}</CardTitle>

          <div className="absolute right-0 top-0">
            <Actions id={id} address={address} isFavorite={isFavorite} />
          </div>
        </div>

        <CardDescription>{`${lat}, ${lng}`}</CardDescription>
      </CardHeader>

      <CardContent className="space-y-2">
        <MarkerImages images={images} alt={address} />

        <div className="relative aspect-video overflow-hidden rounded">
          <Link
            href={`https://www.google.com/maps/dir//${lat},${lng}`}
            target="_blank"
            className="absolute right-2 top-2 z-10"
          >
            <Button tabIndex={-1} variant="outline" size="sm" className="gap-2">
              <Compass className="h-4 w-4" />
              <span>{t("navigate")}</span>
            </Button>
          </Link>

          <MapContainer position={[lat, lng]} />
        </div>

        <div className="flex items-center justify-between">
          <div className="text-sm text-muted-foreground">
            <span>{t("added") + " "}</span>
            <DateToShow date={createdAt} />
          </div>

          <Link href={`/profile/${addedBy?.username}`}>
            <Button tabIndex={-1} size="sm" className="gap-2">
              <User className="h-4 w-4" />
              <span>{addedBy?.username}</span>
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
