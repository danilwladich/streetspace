import type { User } from "@prisma/client";
import type { NextRequest } from "next/server";

export function getAuthUser(req: NextRequest): User {
  return JSON.parse(req.headers.get("x-auth-user") || "{}");
}
