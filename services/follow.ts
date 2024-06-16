import { db } from "@/lib/db";

export async function checkIsFollowingById(
  whoFollowId: string,
  whomFollowId: string,
) {
  if (whoFollowId === whomFollowId) {
    return false;
  }

  const follow = await db.follow.findFirst({
    where: {
      whomFollowUser: {
        id: whomFollowId,
      },
      whoFollowUser: {
        id: whoFollowId,
      },
    },
  });

  return !!follow;
}

export async function getFollowersCountByUsername(username: string) {
  return db.follow.count({
    where: {
      whomFollowUser: {
        username,
      },
    },
  });
}

export async function getFollowingsCountByUsername(username: string) {
  return db.follow.count({
    where: {
      whoFollowUser: {
        username,
      },
    },
  });
}

export async function createFollow(
  whoFollowUserId: string,
  whomFollowUserId: string,
) {
  return db.follow.create({
    data: {
      whoFollowUserId,
      whomFollowUserId,
    },
  });
}

export async function deleteFollow(
  whoFollowUserId: string,
  whomFollowUserId: string,
) {
  return db.follow.delete({
    where: {
      whoFollowUserId_whomFollowUserId: {
        whoFollowUserId,
        whomFollowUserId,
      },
    },
  });
}

export const FOLLOWS_PER_PAGE = 25;

export async function getFollowersByUsername(username: string, page: number) {
  if (page < 1) {
    page = 1;
  }

  const followers = await db.follow.findMany({
    where: {
      whomFollowUser: {
        username,
      },
    },
    include: {
      whoFollowUser: true,
    },
    take: FOLLOWS_PER_PAGE,
    skip: (page - 1) * FOLLOWS_PER_PAGE,
    orderBy: {
      createdAt: "asc",
    },
  });

  const users = followers.map((follow) => follow.whoFollowUser);

  return users;
}

export async function getFollowingsByUsername(username: string, page: number) {
  if (page < 1) {
    page = 1;
  }

  const followings = await db.follow.findMany({
    where: {
      whoFollowUser: {
        username,
      },
    },
    include: {
      whomFollowUser: true,
    },
    take: FOLLOWS_PER_PAGE,
    skip: (page - 1) * FOLLOWS_PER_PAGE,
    orderBy: {
      createdAt: "asc",
    },
  });

  const users = followings.map((follow) => follow.whomFollowUser);

  return users;
}
