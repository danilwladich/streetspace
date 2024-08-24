import type { Prisma } from "@prisma/client";

export type ConfirmedMarker = Prisma.MarkerGetPayload<{
  select: {
    id: true;
    lat: true;
    lng: true;
    address: true;
    images: true;
  };
}>;
