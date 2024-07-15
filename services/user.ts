import { db } from "@/lib/db";
import type { User } from "@prisma/client";

export async function getUsersCount() {
  return await db.user.count();
}

export async function getUsers(page: number, perPage: number) {
  return await db.user.findMany({
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
    where: { id },
  });
}

export async function checkUsername(username: string) {
  const user = await db.user.findFirst({
    where: { username },
    select: { id: true },
  });

  return !!user;
}

export async function getUserByUsername(username: string) {
  return db.user.findFirst({
    where: { username },
  });
}

export async function getUserByEmail(email: string) {
  return db.user.findFirst({
    where: { email },
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
    data,
  });
}
