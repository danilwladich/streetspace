import type { NextRequest } from "next/server";
import { jsonResponse } from "@/lib/json-response";
import { emptyJwt } from "@/lib/serialize-jwt";
import { getAuthUser } from "@/lib/get-auth-user";

export async function GET(req: NextRequest) {
  try {
    const user = getAuthUser(req);

    // Returning a JSON response with user information
    return jsonResponse(user, 200);
  } catch (error) {
    // Handling internal error
    console.log("[AUTH_ME_GET]", error);
    return jsonResponse("Internal Error", 500);
  }
}

export function DELETE(req: NextRequest) {
  try {
    const serialized = emptyJwt();

    // Returning a JSON response with empty jwt token
    return jsonResponse("User log out successfully", 200, {
      headers: { "Set-Cookie": serialized },
    });
  } catch (error) {
    // Handling internal error
    console.log("[AUTH_ME_DELETE]", error);
    return jsonResponse("Internal Error", 500);
  }
}
