import { Link } from "@/lib/navigation";
import { useMemo } from "react";
import dynamic from "next/dynamic";
import { useTranslations } from "next-intl";

import { Button } from "@/components/ui/button";
import { Compass } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

export default function MapSingle({ lat, lng }: { lat: number; lng: number }) {
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
  );
}
