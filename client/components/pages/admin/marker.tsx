import moment from "moment";
import Link from "next/link";
import dynamic from "next/dynamic";
import { useMemo } from "react";
import { MAX_FILES_COUNT } from "@/lib/form-schema";

import type { MarkerType } from "@/types/MarkerType";

import { AppLoader } from "@/components/ui/app-loader";
import Actions from "./actions";
import MarkerImage from "./marker-image";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { User, Compass, ImageOff } from "lucide-react";

export function Marker({
  id,
  name,
  address,
  lat,
  lng,
  type,
  images,
  addedBy,
  createdAt,
}: MarkerType) {
  const MapContainer = useMemo(
    () =>
      dynamic(() => import("@/components/pages/admin/map-container"), {
        loading: () => <AppLoader />,
        ssr: false,
      }),
    [],
  );

  return (
    <Card className="last-child:mb-0 mb-6">
      <CardHeader>
        <CardTitle>{name}</CardTitle>

        <CardDescription>
          <p>{type}</p>
          <p>{address}</p>
          <p>{`${lat}, ${lng}`}</p>
        </CardDescription>
      </CardHeader>

      <CardContent className="flex flex-col items-start gap-2">
        <Link href={`/profile/${addedBy.username}`}>
          <Button tabIndex={-1} size="sm" className="gap-2">
            <User className="h-4 w-4" />
            <span>{addedBy.username}</span>
          </Button>
        </Link>

        <Link
          href={`https://www.google.com/maps/dir/${lat},${lng}`}
          target="_blank"
        >
          <Button tabIndex={-1} size="sm" className="gap-2">
            <Compass className="h-4 w-4" />
            <span>Navigate</span>
          </Button>
        </Link>

        <div className="w-full overflow-auto">
          <div className="my-2 grid w-[800px] grid-cols-5 gap-2 md:w-full">
            {images.map((image) => (
              <MarkerImage key={image.id} {...image} />
            ))}

            {Array.from({
              length: MAX_FILES_COUNT - images.length,
            }).map((_, index) => (
              <div
                key={`empty_${index}`}
                className="relative h-0 border border-dashed pb-[100%]"
              >
                <div className="absolute left-0 top-0 flex h-full w-full flex-col items-center justify-center gap-2 opacity-70">
                  <ImageOff className="h-8 w-8" />
                  <span>No image</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="relative h-0 w-full pb-[56%]">
          <MapContainer position={[lat, lng]} />
        </div>

        <time dateTime={createdAt.toString()} className="text-sm opacity-75">
          {moment(createdAt).fromNow()}
        </time>
      </CardContent>

      <CardFooter className="flex justify-between">
        <Actions id={id} />
      </CardFooter>
    </Card>
  );
}
