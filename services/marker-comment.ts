import { db } from "@/lib/db";

export const COMMENTS_PER_PAGE = 10;

export async function getMarkerComments(markerId: string, page: number) {
  if (page < 1) {
    page = 1;
  }

  return db.markerComment.findMany({
    where: {
      markerId,
    },
    include: {
      commentedBy: {
        select: {
          id: true,
          username: true,
          avatar: true,
        },
      },
    },
    take: COMMENTS_PER_PAGE,
    skip: (page - 1) * COMMENTS_PER_PAGE,
    orderBy: {
      createdAt: "desc",
    },
  });
}

export async function getMarkerCommentsCount(markerId: string) {
  return db.markerComment.count({
    where: {
      markerId,
    },
  });
}

export async function createMarkerComment(
  markerId: string,
  commentedByUserId: string,
  message: string,
) {
  return db.markerComment.create({
    data: {
      markerId,
      commentedByUserId,
      message,
    },
  });
}

export async function checkMarkerCommentOwner(
  commentId: number,
  userId: string,
) {
  const comment = await db.markerComment.findFirst({
    where: {
      id: commentId,
      commentedByUserId: userId,
    },
    select: {
      id: true,
    },
  });

  return !!comment;
}

export async function deleteMarkerComment(id: number) {
  return db.markerComment.delete({
    where: {
      id,
    },
  });
}
