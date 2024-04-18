import { SignJWT } from "jose";
import { nanoid } from "nanoid";
import cookie from "cookie";
import type { User } from "@prisma/client";

const JWT_TOKEN = "jwtToken";
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

  // Serializing the JWT token as a cookie and setting the response headers
  const serialized = cookie.serialize(JWT_TOKEN, jwtToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: COOKIE_MAX_AGE,
    sameSite: "strict",
    path: "/",
  });

  return serialized;
}

export function emptyJwt() {
  const serialized = cookie.serialize(JWT_TOKEN, "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: -1,
    sameSite: "strict",
    path: "/",
  });

  return serialized;
}
