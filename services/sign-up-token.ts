import { db } from "@/lib/db";
import { nanoid } from "nanoid";

export async function createToken(userId: string) {
  const token = nanoid();
  const validUntil = new Date(new Date().getTime() + 1000 * 60 * 10);

  return db.signUpToken.create({
    data: {
      userId,
      token,
      validUntil,
    },
  });
}

export async function checkTokenEmail(email: string) {
  const signUpToken = await db.signUpToken.findFirst({
    where: {
      user: {
        email,
      },
    },
  });

  // If the token does not exist, return false
  if (!signUpToken) {
    return false;
  }

  // If the token is expired, delete it and the user
  if (signUpToken.validUntil < new Date()) {
    await db.signUpToken.delete({
      where: {
        id: signUpToken.id,
      },
    });

    await db.user.delete({
      where: {
        email,
      },
    });

    return false;
  }

  return true;
}

export async function checkTokenValidity(token: string) {
  const signUpToken = await db.signUpToken.findFirst({
    where: {
      token,
    },
  });

  // If the token does not exist, return false
  if (!signUpToken) {
    return false;
  }

  // If the token is expired, delete it and the user
  if (signUpToken.validUntil < new Date()) {
    await db.signUpToken.delete({
      where: {
        token,
      },
    });

    await db.user.delete({
      where: {
        id: signUpToken.userId,
      },
    });

    return false;
  }

  return signUpToken;
}

export async function confirmUser(token: string) {
  const signUpToken = await checkTokenValidity(token);

  // If the token is invalid, return null
  if (!signUpToken) {
    return null;
  }

  // If the token is valid, update the user
  const user = await db.user.update({
    where: {
      id: signUpToken.userId,
    },
    data: {
      confirmed: true,
    },
  });

  // Delete the token
  await db.signUpToken.delete({
    where: {
      token,
    },
  });

  return user;
}
