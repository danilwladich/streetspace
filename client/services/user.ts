import { db } from "@/lib/db";
import type { User } from "@prisma/client";

export async function getUserById(id: string) {
  return await db.user.findFirst({
    where: { id },
  });
}

export async function getUserByUsername(username: string) {
  return await db.user.findFirst({
    where: { username },
  });
}

export async function getUserByEmail(email: string) {
  return await db.user.findFirst({
    where: { email },
  });
}

export async function createUser(data: {
  username: string;
  email: string;
  password: string;
}) {
  return await db.user.create({
    data,
  });
}

export async function updateUser(id: string, data: Partial<User>) {
  return await db.user.update({
    where: { id },
    data,
  });
}
