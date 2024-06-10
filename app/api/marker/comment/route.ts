import type { NextRequest } from "next/server";
import { jsonResponse } from "@/lib/json-response";
import { markerCommentSchema } from "@/lib/form-schema";
import { getAuthUser } from "@/lib/get-auth-user";
import {
  checkMarkerCommentOwner,
  createMarkerComment,
  deleteMarkerComment,
} from "@/services/marker-comment";
import { verifyCaptcha } from "@/lib/server-actions";

export async function POST(req: NextRequest) {
  try {
    // Parsing and validating the request body
    const body = markerCommentSchema.safeParse(await req.json());

    // Handling validation errors
    if (!body.success) {
      return jsonResponse("Validation Error", 400);
    }

    const { markerId, message, recaptchaToken } = body.data;

    // Verifying the recaptcha token
    const isRecaptchaCorrect = await verifyCaptcha(recaptchaToken);

    // Handling recaptcha verification failure
    if (!isRecaptchaCorrect) {
      return jsonResponse("Antibot system not passed", 400);
    }

    const authUser = getAuthUser();

    // Creating a new comment
    const comment = await createMarkerComment(markerId, authUser.id, message);

    return jsonResponse(comment, 201);
  } catch (error) {
    // Handling internal error
    console.log("[MARKER_COMMENT_POST]", error);
    return jsonResponse("Internal Error", 500);
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { id } = await req.json();

    // Check if the comment id is provided
    if (!id) {
      return jsonResponse("Invalid Request", 400);
    }

    const authUser = getAuthUser();

    // Check if the user is the owner of the comment
    const isOwner =
      authUser.role === "ADMIN" ||
      (await checkMarkerCommentOwner(id, authUser.id));

    if (!isOwner) {
      return jsonResponse("Invalid Request", 400);
    }

    // Deleting the comment
    await deleteMarkerComment(id);

    return jsonResponse("Comment deleted successfully", 201);
  } catch (error) {
    // Handling internal error
    console.log("[MARKER_COMMENT_DELETE]", error);
    return jsonResponse("Internal Error", 500);
  }
}
