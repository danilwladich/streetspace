import type { NextRequest } from "next/server";
import { jsonResponse } from "@/lib/json-response";
import { blockUser, getUserById } from "@/lib/server-actions";

export async function PATCH(req: NextRequest) {
  try {
    const { userId, bool } = await req.json();

    // Check if the user id and bool is provided
    if (!userId || bool === undefined) {
      return jsonResponse("User id or bool wasn't provided", 400);
    }

    const user = await getUserById(userId);

    // Check if the user exists
    if (!user) {
      return jsonResponse("User doesn't exist", 400);
    }

    // Block the user
    const isSuccess = await blockUser(userId, bool);

    // Check if the user was blocked successfully
    if (!isSuccess) {
      return jsonResponse("An error occurred while blocking a user", 400);
    }

    // Return success response
    return jsonResponse("User block status changed successfully", 201);
  } catch (error) {
    // Handling internal error
    console.log("[ADMIN_BLOCK_PATCH]", error);
    return jsonResponse("Internal Error", 500);
  }
}
