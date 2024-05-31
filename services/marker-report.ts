import { db } from "@/lib/db";

export function getReportedMarkersCount() {
  return db.marker.count({
    where: {
      reports: {
        some: {},
      },
    },
  });
}

export const REPORTED_MARKERS_PER_PAGE = 50;

export function getReportedMarkers(page: number) {
  if (page < 1) {
    page = 1;
  }

  return db.marker.findMany({
    where: {
      reports: {
        some: {},
      },
    },
    select: {
      id: true,
      address: true,
      _count: {
        select: {
          reports: true,
        },
      },
    },
    take: REPORTED_MARKERS_PER_PAGE,
    skip: (page - 1) * REPORTED_MARKERS_PER_PAGE,
    orderBy: {
      reports: {
        _count: "desc",
      },
    },
  });
}

export const MARKER_REPORTS_PER_PAGE = 50;

export function getMarkerReportsById(id: string, page: number) {
  if (page < 1) {
    page = 1;
  }

  return db.markerReport.findMany({
    where: {
      markerId: id,
    },
    include: {
      reportedBy: true,
    },
    take: MARKER_REPORTS_PER_PAGE,
    skip: (page - 1) * MARKER_REPORTS_PER_PAGE,
    orderBy: {
      updatedAt: "desc",
    },
  });
}

export function getMarkerReportsCountById(id: string) {
  return db.markerReport.count({
    where: {
      markerId: id,
    },
  });
}
