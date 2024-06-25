import type { NextRequest } from "next/server";
import { jsonResponse } from "@/lib/json-response";
import { getAuthUser } from "@/lib/get-auth-user";
import { emptyJwt, serializeJwt } from "@/lib/serialize-jwt";
import { getUserById } from "@/services/user";

export async function GET(req: NextRequest) {
  try {
    const authUser = getAuthUser();

    const user = await getUserById(authUser.id);

    if (!user) {
      return jsonResponse("Unauthorized", 401);
    }

    // Serializing user data
    await serializeJwt(user);

    return jsonResponse(user, 200);
  } catch (error) {
    // Handling internal error
    console.log("[AUTH_ME_GET]", error);
    return jsonResponse("Internal Error", 500);
  }
}

export async function DELETE(req: NextRequest) {
  // Emptying the JWT cookie
  emptyJwt();

  return jsonResponse("User logged out successfully", 200);
}
