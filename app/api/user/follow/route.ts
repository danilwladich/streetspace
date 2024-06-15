import type { NextRequest } from "next/server";
import { jsonResponse } from "@/lib/json-response";
import { getAuthUser } from "@/lib/get-auth-user";
import { createFollow, deleteFollow } from "@/services/follow";

export async function POST(req: NextRequest) {
  try {
    const { userId } = await req.json();

    // Check if the user id is provided
    if (!userId) {
      return jsonResponse("Invalid Request", 400);
    }

    const authUser = getAuthUser();

    // Check if the user is trying to follow themselves
    if (userId === authUser.id) {
      return jsonResponse("You can't follow yourself", 400);
    }

    // Create a new follow
    await createFollow(authUser.id, userId);

    return jsonResponse("User followed successfully", 201);
  } catch (error) {
    // Handling internal error
    console.log("[USER_FOLLOW_POST]", error);
    return jsonResponse("Internal Error", 500);
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { userId } = await req.json();

    // Check if the user id is provided
    if (!userId) {
      return jsonResponse("Invalid Request", 400);
    }

    const authUser = getAuthUser();

    // Check if the user is trying to unfollow themselves
    if (userId === authUser.id) {
      return jsonResponse("You can't unfollow yourself", 400);
    }

    // Delete the follow
    await deleteFollow(authUser.id, userId);

    return jsonResponse("User unfollowed successfully", 201);
  } catch (error) {
    // Handling internal error
    console.log("[USER_FOLLOW_DELETE]", error);
    return jsonResponse("Internal Error", 500);
  }
}
