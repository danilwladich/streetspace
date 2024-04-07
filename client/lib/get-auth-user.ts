import type { UserType } from "@/types/UserType";
import type { NextRequest } from "next/server";

export function getAuthUser(req: NextRequest): UserType | null {
  return JSON.parse(req.headers.get("x-auth-user") || "null");
}
