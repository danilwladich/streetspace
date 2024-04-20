import { headers } from "next/headers";
import type { User } from "@prisma/client";

export function getAuthUser(): User {
  const headersList = headers();
  const authUser = headersList.get("x-auth-user");
  return JSON.parse(authUser || "{}");
}
