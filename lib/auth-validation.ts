import { jwtVerify } from "jose";
import { cookies } from "next/headers";
import type { User } from "@prisma/client";

const jwtSecret = process.env.JWT_SECRET || "jwt_secret";

export async function authValidation(): Promise<User | undefined> {
  try {
    // Extracting JWT token from the "JWT_TOKEN" cookie
    const cookieStore = cookies();
    const jwtToken = cookieStore.get("JWT_TOKEN")?.value;

    // Checking if the JWT token is present
    if (!jwtToken) {
      return undefined;
    }

    // Verifying the JWT token using the provided secret
    const key = new TextEncoder().encode(jwtSecret);
    const { payload: user } = await jwtVerify<User>(jwtToken, key);

    // Returning the authenticated user information
    return user;
  } catch (e) {
    return undefined;
  }
}
