import type { NextRequest } from "next/server";
import { jsonResponse } from "@/lib/json-response";
import { getUserById, updateUser } from "@/services/user";

export async function PATCH(req: NextRequest) {
  try {
    const { userId, bool } = await req.json();

    // Check if the user id and bool is provided
    if (!userId || bool === undefined) {
      return jsonResponse("Invalid Request", 400);
    }

    const user = await getUserById(userId);

    // Check if the user exists
    if (!user) {
      return jsonResponse("Invalid Request", 400);
    }

    // Block the user
    await updateUser(userId, { blocked: bool });

    // Return success response
    return jsonResponse("User block status changed successfully", 201);
  } catch (error) {
    // Handling internal error
    console.log("[ADMIN_BLOCK_PATCH]", error);
    return jsonResponse("Internal Error", 500);
  }
}
