import { db } from "@/lib/db";
import type { Marker } from "@prisma/client";

export async function getMarkersCount() {
  return db.marker.count({
    where: {
      confirmed: true,
    },
  });
}

export async function getMarkerById(id: string, confirmed?: boolean) {
  return db.marker.findFirst({
    where: {
      id,
      confirmed,
    },
    include: {
      addedBy: {
        select: {
          id: true,
          username: true,
        },
      },
    },
  });
}

export async function getAllMarkers(page: number, perPage: number) {
  return await db.marker.findMany({
    select: {
      id: true,
      updatedAt: true,
    },
    skip: page * perPage,
    take: perPage,
    orderBy: {
      createdAt: "asc",
    },
  });
}

export async function getMarkers({
  latMin,
  latMax,
  lngMin,
  lngMax,
}: {
  latMin: string;
  latMax: string;
  lngMin: string;
  lngMax: string;
}) {
  return db.marker.findMany({
    where: {
      confirmed: true,
      lat: {
        gte: parseFloat(latMin),
        lte: parseFloat(latMax),
      },
      lng: {
        gte: parseFloat(lngMin),
        lte: parseFloat(lngMax),
      },
    },
    select: {
      id: true,
      lat: true,
      lng: true,
      address: true,
      images: true,
    },
    take: 100,
    orderBy: {
      visitors: {
        _count: "desc",
      },
    },
  });
}

const DUPLICATE_DEVIATION = 5 / 1000;

export async function checkMarkerDuplicate(lat: number, lng: number) {
  const marker = await db.marker.findFirst({
    where: {
      lat: {
        gte: lat - DUPLICATE_DEVIATION,
        lte: lat + DUPLICATE_DEVIATION,
      },
      lng: {
        gte: lng - DUPLICATE_DEVIATION,
        lte: lng + DUPLICATE_DEVIATION,
      },
    },
    select: {
      id: true,
    },
  });

  return !!marker;
}

export const UNCONFIRMED_MARKERS_PER_PAGE = 10;

export async function getUnconfirmedMarkers(page: number) {
  if (page < 1) {
    page = 1;
  }

  return db.marker.findMany({
    where: {
      confirmed: false,
    },
    include: {
      addedBy: {
        select: {
          id: true,
          username: true,
        },
      },
    },
    take: UNCONFIRMED_MARKERS_PER_PAGE,
    skip: (page - 1) * UNCONFIRMED_MARKERS_PER_PAGE,
    orderBy: {
      createdAt: "asc",
    },
  });
}

export async function getUnconfirmedMarkersCount() {
  return db.marker.count({
    where: {
      confirmed: false,
    },
  });
}

export async function createMarker(data: {
  lat: number;
  lng: number;
  address: string;
  images: string;
  addedByUserId: string;
  confirmed: boolean;
}) {
  return db.marker.create({
    data,
  });
}

export async function updateMarker(id: string, data: Partial<Marker>) {
  return db.marker.update({
    where: {
      id,
    },
    data,
  });
}

export async function deleteMarker(id: string) {
  await db.markerReport.deleteMany({
    where: {
      markerId: id,
    },
  });

  return db.marker.delete({
    where: {
      id,
    },
  });
}

export async function getUserMarkersCount(userId: string) {
  return db.marker.count({
    where: {
      confirmed: true,
      addedBy: {
        id: userId,
      },
    },
  });
}

export async function upsertMarkerReport(data: {
  markerId: string;
  reportedByUserId: string;
  type: string;
  message?: string;
}) {
  return db.markerReport.upsert({
    where: {
      markerId_reportedByUserId: {
        markerId: data.markerId,
        reportedByUserId: data.reportedByUserId,
      },
    },
    create: data,
    update: data,
  });
}
