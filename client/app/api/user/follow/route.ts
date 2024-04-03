import type { NextRequest } from "next/server";
import { jsonResponse } from "@/lib/json-response";
import {
  followUser,
  unfollowUser,
  getFollowById,
  getUserById,
} from "@/lib/server-actions";
import { getAuthUser } from "@/lib/get-auth-user";

export async function POST(req: NextRequest) {
  try {
    const { userId } = await req.json();

    // Check if the user id is provided
    if (!userId) {
      return jsonResponse("User id required", 400);
    }

    const user = await getUserById(userId);

    // Check if the user exists
    if (!user) {
      return jsonResponse("User doesn't exist", 400);
    }

    const authUser = getAuthUser(req);

    // Check if the user is trying to follow themselves
    if (user.id === authUser.id) {
      return jsonResponse("You can't follow yourself", 400);
    }

    // Check if the user is already following the user
    const followId = await getFollowById(userId, authUser.id);

    // If the user is already following the user, return an error
    if (followId) {
      return jsonResponse("You already following this user", 400);
    }

    // Create a new follow
    const isSuccess = await followUser(userId, authUser.id);

    if (!isSuccess) {
      return jsonResponse("An error occurred while creating a new follow", 400);
    }

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
      return jsonResponse("User id required", 400);
    }

    const user = await getUserById(userId);

    // Check if the user exists
    if (!user) {
      return jsonResponse("User doesn't exist", 400);
    }

    const authUser = getAuthUser(req);

    // Check if the user is trying to unfollow themselves
    if (user.id === authUser.id) {
      return jsonResponse("You can't unfollow yourself", 400);
    }

    // Create a new follow
    const isSuccess = await unfollowUser(userId, authUser.id);

    if (!isSuccess) {
      return jsonResponse("An error occurred while deleting a follow ", 400);
    }

    return jsonResponse("User unfollowed successfully", 201);
  } catch (error) {
    // Handling internal error
    console.log("[USER_FOLLOW_DELETE]", error);
    return jsonResponse("Internal Error", 500);
  }
}
