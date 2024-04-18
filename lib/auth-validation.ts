import { jwtVerify } from "jose";
import { cookies } from "next/headers";
import type { User } from "@prisma/client";

const jwtSecret = process.env.JWT_SECRET || "jwt_secret";

export async function authValidation(): Promise<User | undefined> {
  try {
    // Extracting JWT token from the "jwtToken" cookie
    const cookieStore = cookies();
    const jwtToken = cookieStore.get("jwtToken")?.value;

    // Checking if the JWT token is present
    if (!jwtToken) {
      return undefined;
    }

    // Verifying the JWT token using the provided secret
    const { payload: user } = await jwtVerify(
      jwtToken,
      new TextEncoder().encode(jwtSecret),
    );

    // Returning the authenticated user information
    return user as User;
  } catch (e) {
    return undefined;
  }
}
