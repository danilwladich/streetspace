import type { NextRequest } from "next/server";
import { jsonResponse } from "@/lib/json-response";
import { getAuthUser } from "@/lib/get-auth-user";
import { emptyJwt } from "@/lib/serialize-jwt";

export function GET(req: NextRequest) {
  const authUser = getAuthUser(req);

  if (!authUser) {
    return jsonResponse("Unauthorized", 401);
  }

  return jsonResponse(authUser, 200);
}

export async function DELETE(req: NextRequest) {
  const serialized = emptyJwt();

  return jsonResponse("User logged out successfully", 200, {
    headers: { "Set-Cookie": serialized },
  });
}
