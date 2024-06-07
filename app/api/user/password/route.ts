import type { NextRequest } from "next/server";
import { jsonResponse } from "@/lib/json-response";
import { changePasswordSchema } from "@/lib/form-schema";
import { emptyJwt } from "@/lib/serialize-jwt";
import { updateUser } from "@/services/user";
import { getAuthUser } from "@/lib/get-auth-user";
import bcrypt from "bcryptjs";

export async function PATCH(req: NextRequest) {
  try {
    // Parsing and validating the request body
    const body = changePasswordSchema.safeParse(await req.json());

    // Handling validation errors
    if (!body.success) {
      return jsonResponse("Validation Error", 400);
    }

    const { currentPassword, newPassword } = body.data;

    const authUser = getAuthUser();

    // Comparing the provided password with the hashed password
    const isPasswordCorrect = await bcrypt.compare(
      currentPassword,
      authUser.password,
    );

    // Handling incorrect password error
    if (!isPasswordCorrect) {
      return jsonResponse(
        {
          field: "currentPassword",
          message: "Incorrect password",
        },
        400,
      );
    }

    // Hashing the password
    const hashedPassword = await bcrypt.hash(newPassword, 12);

    // Updating the user information
    const user = await updateUser(authUser.id, {
      password: hashedPassword,
    });

    // Removing the JWT token from the cookie
    emptyJwt();

    // Returning a JSON response with user information
    return jsonResponse(user, 201);
  } catch (error) {
    // Handling internal error
    console.log("[USER_PASSWORD_PATCH]", error);
    return jsonResponse("Internal Error", 500);
  }
}
