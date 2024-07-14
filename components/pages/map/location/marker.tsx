import { checkAuthIsMarkerVisitor } from "@/services/marker-visitor";
import type { Prisma } from "@prisma/client";

import MarkerImages from "@/components/common/marker/marker-images";
import Actions from "./actions/actions";
import MapSingle from "./map-single";
import AddedBy from "./added-by";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";

type MarkerType = Prisma.MarkerGetPayload<{
  include: {
    addedBy: {
      select: {
        id: true;
        username: true;
      };
    };
  };
}>;

export default async function Marker({
  id,
  address,
  lat,
  lng,
  images,
  addedBy,
  createdAt,
}: MarkerType) {
  const isVisitor = await checkAuthIsMarkerVisitor(id);

  return (
    <Card className="max-w-4xl">
      <CardHeader>
        <div className="relative">
          <CardTitle className="pr-14">
            <h1>{address}</h1>
          </CardTitle>

          <div className="absolute right-0 top-0">
            <Actions id={id} address={address} isVisitor={isVisitor} />
          </div>
        </div>

        <CardDescription>{`${lat}, ${lng}`}</CardDescription>
      </CardHeader>

      <CardContent className="space-y-2">
        <MarkerImages images={images} alt={address} />

        <MapSingle lat={lat} lng={lng} />
      </CardContent>

      <CardFooter className="flex items-center justify-between">
        <AddedBy username={addedBy.username} addedAt={createdAt} />
      </CardFooter>
    </Card>
  );
}
