import { authValidation } from "@/lib/auth-validation";
import { db } from "@/lib/db";

export async function createMarkerVisitor(markerId: string, userId: string) {
  await db.markerVisitor.create({
    data: {
      markerId,
      userId,
    },
  });
}

export async function deleteMarkerVisitor(markerId: string, userId: string) {
  await db.markerVisitor.delete({
    where: {
      markerId_userId: {
        markerId,
        userId,
      },
    },
  });
}

export async function checkAuthIsMarkerVisitor(markerId: string) {
  const authUser = await authValidation();

  if (!authUser) {
    return false;
  }

  const marker = await db.markerVisitor.findFirst({
    where: {
      markerId,
      userId: authUser.id,
    },
  });

  return !!marker;
}

export const MARKER_VISITORS_PER_PAGE = 25;

export async function getMarkerVisitorsById(
  markerId: string,
  page: number,
  perPage: number = MARKER_VISITORS_PER_PAGE,
) {
  if (page < 1) {
    page = 1;
  }

  const marker = await db.markerVisitor.findMany({
    where: {
      markerId,
    },
    select: {
      user: true,
    },
    take: perPage,
    skip: (page - 1) * perPage,
    orderBy: {
      createdAt: "asc",
    },
  });

  return marker.map((m) => m.user);
}

export async function getMarkerVisitorsCount(markerId: string) {
  return db.markerVisitor.count({
    where: {
      markerId,
    },
  });
}

export async function getUserMarkersVisitsCount(userId: string) {
  return db.markerVisitor.count({
    where: {
      userId,
    },
  });
}

export const USER_MARKERS_VISITS_PER_PAGE = 25;

export async function getUserMarkersVisits(
  userId: string,
  page: number,
  perPage: number = USER_MARKERS_VISITS_PER_PAGE,
) {
  const marker = await db.markerVisitor.findMany({
    where: {
      userId,
    },
    select: {
      marker: true,
    },
    take: perPage,
    skip: (page - 1) * perPage,
    orderBy: {
      createdAt: "desc",
    },
  });

  return marker.map((m) => m.marker);
}
