import Link from "next/link";
import dynamic from "next/dynamic";
import { useMemo } from "react";
import type { Prisma } from "@prisma/client";

import MarkerImages from "@/components/common/marker/marker-images";
import { AppLoader } from "@/components/ui/app-loader";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { User, Compass } from "lucide-react";
import { DateToShow } from "@/components/common/date-to-show";

type MarkerType = Prisma.MarkerGetPayload<{
  include: { addedBy: true };
}>;

// TODO: Add actions (Like, report etc)

export function Marker({
  name,
  address,
  lat,
  lng,
  images,
  addedBy,
  createdAt,
}: MarkerType) {
  const MapContainer = useMemo(
    () =>
      dynamic(
        () => import("@/components/common/map-container/map-single-marker"),
        {
          loading: () => <AppLoader />,
          ssr: false,
        },
      ),
    [],
  );

  return (
    <Card className="max-w-4xl">
      <CardHeader>
        <CardTitle>{name}</CardTitle>

        <CardDescription>{address}</CardDescription>
      </CardHeader>

      <CardContent className="flex flex-col items-start gap-2">
        <MarkerImages images={images} name={name} />

        <div className="relative aspect-video w-full overflow-hidden rounded">
          <Link
            href={`https://www.google.com/maps/dir/${lat},${lng}`}
            target="_blank"
            className="absolute right-2 top-2 z-10"
          >
            <Button tabIndex={-1} variant="outline" size="sm" className="gap-2">
              <Compass className="h-4 w-4" />
              <span>Navigate</span>
            </Button>
          </Link>

          <MapContainer position={[lat, lng]} />
        </div>

        <div className="flex w-full items-center justify-between">
          <div className="text-sm opacity-75">
            <span>Added </span>
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
