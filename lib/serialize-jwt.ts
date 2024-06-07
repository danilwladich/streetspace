import { SignJWT } from "jose";
import { nanoid } from "nanoid";
import { cookies } from "next/headers";
import type { User } from "@prisma/client";

const JWT_TOKEN = "JWT_TOKEN";
const COOKIE_MAX_AGE = 60 * 60 * 24 * 28;
const jwtSecret = process.env.JWT_SECRET || "jwt_secret";

export async function serializeJwt(user: User) {
  // Generating a JWT token with user information excluding the password
  const jwtToken = await new SignJWT(user)
    .setProtectedHeader({ alg: "HS256" })
    .setJti(nanoid())
    .setIssuedAt()
    .setExpirationTime("28d")
    .sign(new TextEncoder().encode(jwtSecret));

  // Setting the JWT token in a cookie
  cookies().set({
    name: JWT_TOKEN,
    value: jwtToken,
    httpOnly: true,
    path: "/",
    maxAge: COOKIE_MAX_AGE,
    sameSite: "strict",
    // secure: process.env.NODE_ENV === "production",
  });
}

export function emptyJwt() {
  cookies().delete(JWT_TOKEN);
}
