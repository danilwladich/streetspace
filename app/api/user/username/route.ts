import type { NextRequest } from "next/server";
import { editUsernameSchema } from "@/lib/form-schema";
import { jsonResponse } from "@/lib/json-response";
import { getAuthUser } from "@/lib/get-auth-user";
import { getUserByUsername, updateUser } from "@/services/user";
import { serializeJwt } from "@/lib/serialize-jwt";

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
    const usernameAlreadyTaken = !!(await getUserByUsername(username));

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

    const authUser = getAuthUser();

    // Updating the user information
    const user = await updateUser(authUser.id, {
      username,
    });

    // Serializing the user object into a JWT token
    const serialized = await serializeJwt(user);

    // Returning a JSON response with user information and set cookie header
    return jsonResponse(user, 201, {
      headers: { "Set-Cookie": serialized },
    });
  } catch (error) {
    // Handling internal error
    console.log("[USER_USERNAME_PATCH]", error);
    return jsonResponse("Internal Error", 500);
  }
}
