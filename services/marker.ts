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
  const marker = await db.marker.findFirst({
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

  if (!marker) {
    return null;
  }

  const rates = await db.markerRate.aggregate({
    where: {
      marker: {
        id,
      },
    },
    _avg: {
      rate: true,
    },
    _count: {
      _all: true,
    },
  });

  return {
    ...marker,
    avgRate: rates._avg.rate ?? 0,
    ratesCount: rates._count._all ?? 0,
  };
}

export async function getMarkers(page: number, perPage: number) {
  return await db.marker.findMany({
    where: {
      confirmed: true,
    },
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

export async function getAllMarkers() {
  const markers = await db.marker.findMany({
    where: {
      confirmed: true,
    },
    select: {
      id: true,
      lat: true,
      lng: true,
      address: true,
      images: true,
    },
  });

  const rates = await db.markerRate.groupBy({
    by: ["markerId"],
    where: {
      marker: {
        confirmed: true,
      },
    },
    _avg: {
      rate: true,
    },
    _count: {
      _all: true,
    },
  });

  return markers.map((marker) => {
    const markerRates = rates.find((rate) => rate.markerId === marker.id);
    return {
      ...marker,
      avgRate: markerRates?._avg.rate ?? 0,
      ratesCount: markerRates?._count._all ?? 0,
    };
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
  address: {
    road: string;
    city: string;
    postcode: string;
    country: string;
  };
  images: string[];
  addedByUserId: string;
  confirmed: boolean;
}) {
  return db.marker.create({
    data: {
      ...data,
      address: JSON.parse(JSON.stringify(data.address)),
    },
  });
}

export async function updateMarker(id: string, data: Partial<Marker>) {
  return db.marker.update({
    where: {
      id,
    },
    data: {
      ...data,
      address: data.address || undefined,
      images: data.images || undefined,
    },
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
