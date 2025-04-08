import { db } from "@/lib/db";
import { checkToken } from "@/services/sign-up-token";
import { UserProfile } from "@/types/user";
import { Prisma, type User } from "@prisma/client";

export async function getUsersCount() {
  return await db.user.count({ where: { confirmed: true } });
}

export async function getUsers(page: number, perPage: number) {
  return await db.user.findMany({
    where: { confirmed: true },
    select: {
      id: true,
      username: true,
      updatedAt: true,
    },
    skip: page * perPage,
    take: perPage,
    orderBy: {
      createdAt: "asc",
    },
  });
}

export async function getUserById(id: string) {
  return await db.user.findFirst({
    where: { id, confirmed: true },
  });
}

export async function checkUsername(username: string) {
  const user = await db.user.findFirst({
    where: { username },
    select: { id: true, confirmed: true, email: true },
  });

  // If the user is not found, return false
  if (!user) {
    return false;
  }

  // If the user is not confirmed
  if (!user.confirmed) {
    // Check sign up token
    const validatedToken = await checkToken({ email: user.email });

    // If the token is not valid
    if (!validatedToken) {
      return false;
    }
  }

  return true;
}

export async function getUserProfile(
  username: string,
): Promise<UserProfile | null> {
  return db.user.findFirst({
    where: { username, confirmed: true },
    select: {
      id: true,
      username: true,
      email: true,
      avatar: true,
      bio: true,
      dateOfBirth: true,
      coords: true,
      country: true,
      city: true,
      blocked: true,
      socialMedia: true,
      createdAt: true,
    },
  });
}

export async function getUserByUsername(username: string) {
  return db.user.findFirst({
    where: { username, confirmed: true },
  });
}

export async function checkEmail(email: string) {
  const user = await db.user.findFirst({
    where: { email },
    select: { id: true },
  });

  return !!user;
}

export async function getUserByEmail(email: string) {
  return db.user.findFirst({
    where: { email, confirmed: true },
  });
}

export async function createUser(data: {
  username: string;
  email: string;
  password: string;
}) {
  return db.user.create({
    data,
  });
}

export async function updateUser(id: string, data: Partial<User>) {
  return db.user.update({
    where: { id },
    data: {
      ...data,
      socialMedia:
        data.socialMedia === null ? Prisma.JsonNull : data.socialMedia,
    },
  });
}
