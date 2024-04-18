import { authValidation } from "@/lib/auth-validation";
import { db } from "@/lib/db";

export async function getAuthIsFollowingByUsername(username: string) {
  const authUser = await authValidation();

  if (!authUser || authUser.username === username) {
    return false;
  }

  const follow = await db.follow.findFirst({
    where: {
      whomFollowUser: {
        username,
      },
      whoFollowUserId: authUser.id,
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
  return db.follow.deleteMany({
    where: {
      whoFollowUserId,
      whomFollowUserId,
    },
  });
}
