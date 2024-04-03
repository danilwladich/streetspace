import type { NextRequest } from "next/server";
import { editUsernameSchema } from "@/lib/form-schema";
import { jsonResponse } from "@/lib/json-response";
import { getAuthUser } from "@/lib/get-auth-user";
import { serializeJwt } from "@/lib/serialize-jwt";
import { changeUsername, checkUsername } from "@/lib/server-actions";

export async function PATCH(req: NextRequest) {
  try {
    // Parsing and validating the request body
    const body = editUsernameSchema.safeParse(await req.json());

    // Handling validation errors
    if (!body.success) {
      return jsonResponse("Validation Error", 400);
    }

    const { username } = body.data;

    // Checking if the provided username is already taken
    const usernameAlreadyTaken = await checkUsername(username);

    // Handling existing username error
    if (usernameAlreadyTaken) {
      return jsonResponse(
        {
          field: "username",
          message: "Username already taken",
        },
        400,
      );
    }

    const authUser = getAuthUser(req);

    const user = await changeUsername(authUser.id, username);

    if (!user) {
      return jsonResponse("An error occurred while changing a username", 400);
    }

    // Returning a JSON response with user information
    return jsonResponse(user, 200);
  } catch (error) {
    // Handling internal error
    console.log("[USER_USERNAME_PATCH]", error);
    return jsonResponse("Internal Error", 500);
  }
}
