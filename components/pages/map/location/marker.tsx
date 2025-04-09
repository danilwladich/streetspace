import { checkAuthIsMarkerVisitor } from "@/services/marker-visitor";
import { addressToString } from "@/lib/address-helper";
import type { Prisma } from "@prisma/client";

import MarkerImages from "@/components/common/marker/marker-images";
import Actions from "./actions/actions";
import MapSingle from "./map-single";
import AddedBy from "./added-by";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import Rates from "@/components/common/rates";

type MarkerType = Prisma.MarkerGetPayload<{
  include: {
    addedBy: {
      select: {
        id: true;
        username: true;
      };
    };
  };
}> & {
  avgRate: number;
  ratesCount: number;
};

export default async function Marker({
  id,
  address,
  lat,
  lng,
  images,
  addedBy,
  createdAt,
  avgRate,
  ratesCount,
}: MarkerType) {
  const isVisitor = await checkAuthIsMarkerVisitor(id);

  const addressString = addressToString(address);

  return (
    <Card className="max-w-4xl">
      <CardHeader>
        <div className="relative">
          <CardTitle className="pr-14">
            <h1>{addressString}</h1>
          </CardTitle>

          <div className="absolute right-0 top-0">
            <Actions id={id} address={addressString} isVisitor={isVisitor} />
          </div>
        </div>

        <Rates avg={avgRate} count={ratesCount} />
      </CardHeader>

      <CardContent className="space-y-2">
        <MarkerImages images={images as string[]} alt={addressString} />

        <MapSingle lat={lat} lng={lng} />
      </CardContent>

      <CardFooter className="flex items-center justify-between">
        <AddedBy username={addedBy.username} addedAt={createdAt} />
      </CardFooter>
    </Card>
  );
}
