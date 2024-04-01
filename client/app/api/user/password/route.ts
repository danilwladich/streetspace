import type { NextRequest } from "next/server";
import { jsonResponse } from "@/lib/json-response";
import { getJwt } from "@/lib/get-jwt";
import { changePasswordSchema } from "@/lib/form-schema";
import { emptyJwt } from "@/lib/serialize-jwt";

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
    const res = await fetch(
      `${process.env.STRAPI_URL}/api/auth/change-password`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getJwt()}`,
        },
        body: JSON.stringify({
          currentPassword,
          password: newPassword,
          passwordConfirmation,
        }),
      },
    );
    const data = await res.json();

    // Handling incorrect password
    if (data.error) {
      return jsonResponse(data.error.message, 400);
    }

    // Log out the user
    const serialized = emptyJwt();

    return jsonResponse(data, 200, {
      headers: { "Set-Cookie": serialized },
    });
  } catch (error) {
    // Handling internal error
    console.log("[USER_PASSWORD_PATCH]", error);
    return jsonResponse("Internal Error", 500);
  }
}
