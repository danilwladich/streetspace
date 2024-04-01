import type { NextRequest } from "next/server";
import { jsonResponse } from "@/lib/json-response";
import { changePasswordSchema } from "@/lib/form-schema";
import { emptyJwt } from "@/lib/serialize-jwt";
import { changePassword } from "@/lib/server-actions";

export async function PATCH(req: NextRequest) {
  try {
    // Parsing and validating the request body
    const body = changePasswordSchema.safeParse(await req.json());

    // Handling validation errors
    if (!body.success) {
      return jsonResponse("Validation Error", 400);
    }

    const { currentPassword, newPassword, passwordConfirmation } = body.data;

    // Sending the request to the API
    const data = await changePassword(
      currentPassword,
      newPassword,
      passwordConfirmation,
    );

    // Handling incorrect password
    if (data.error) {
      return jsonResponse(data.error, 400);
    }

    // Log out the user
    const serialized = emptyJwt();

    return jsonResponse("Password changed successfully", 200, {
      headers: { "Set-Cookie": serialized },
    });
  } catch (error) {
    // Handling internal error
    console.log("[USER_PASSWORD_PATCH]", error);
    return jsonResponse("Internal Error", 500);
  }
}
