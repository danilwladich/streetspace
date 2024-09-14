import type { NextRequest } from "next/server";
import { jsonResponse } from "@/lib/json-response";
import { confirmUser } from "@/services/sign-up-token";
import { serializeJwt } from "@/lib/serialize-jwt";
import { verifyCaptcha } from "@/lib/server-actions";
import { registerConfirmationSchema } from "@/lib/form-schema";

export async function POST(req: NextRequest) {
  try {
    // Parsing and validating the request body
    const body = registerConfirmationSchema.safeParse(await req.json());

    // Handling validation errors
    if (!body.success) {
      return jsonResponse("Validation Error", 400);
    }

    const { token, email, recaptchaToken } = body.data;

    // Verifying the recaptcha token
    const isRecaptchaCorrect = await verifyCaptcha(recaptchaToken);

    // Handling recaptcha verification failure
    if (!isRecaptchaCorrect) {
      return jsonResponse("Antibot system not passed", 400);
    }

    // Confirming the user
    const user = await confirmUser({ token, email });

    // Handling invalid token
    if (!user) {
      return jsonResponse(
        {
          field: "token",
          message: "Invalid token",
        },
        400,
      );
    }

    // Serializing the user object into a JWT token
    await serializeJwt(user);

    // Returning a JSON response with user information
    return jsonResponse(user, 201);
  } catch (error) {
    // Handling internal error
    console.log("[REGISTER_CONFIRM_POST]", error);
    return jsonResponse("Internal Error", 500);
  }
}
