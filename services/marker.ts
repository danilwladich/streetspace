import { authValidation } from "@/lib/auth-validation";
import { db } from "@/lib/db";
import type { Marker } from "@prisma/client";

export async function getMarkerById(id: string) {
  return db.marker.findFirst({
    where: {
      id,
    },
    include: {
      addedBy: true,
    },
  });
}

export async function checkAuthIsFavoriteMarker(markerId: string) {
  const authUser = await authValidation();

  if (!authUser) {
    return false;
  }

  const marker = await db.marker.findFirst({
    where: {
      id: markerId,
      favorites: {
        some: {
          id: authUser.id,
        },
      },
    },
  });

  return !!marker;
}

export async function getMarkerFavoritesCount(markerId: string) {
  const marker = await db.marker.findFirst({
    where: {
      id: markerId,
    },
    select: {
      _count: {
        select: { favorites: true },
      },
    },
  });

  return marker?._count.favorites || 0;
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
      favorites: {
        _count: "desc",
      },
    },
  });
}

export async function getUnconfirmedMarkers() {
  return db.marker.findMany({
    where: {
      confirmed: false,
    },
    include: {
      addedBy: {
        select: {
          username: true,
        },
      },
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

export async function addFavoriteMarker(markerId: string, userId: string) {
  return db.marker.update({
    where: {
      id: markerId,
    },
    data: {
      favorites: {
        connect: {
          id: userId,
        },
      },
    },
  });
}

export async function removeFavoriteMarker(markerId: string, userId: string) {
  return db.marker.update({
    where: {
      id: markerId,
    },
    data: {
      favorites: {
        disconnect: {
          id: userId,
        },
      },
    },
  });
}

export async function deleteMarker(id: string) {
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
