import type { NextRequest } from "next/server";
import { registerSchema } from "@/lib/form-schema";
import {
  checkEmail,
  checkUsername,
  register,
  verifyCaptcha,
} from "@/lib/server-actions";
import { jsonResponse } from "@/lib/json-response";
import { serializeJwt } from "@/lib/serialize-jwt";

export async function POST(req: NextRequest) {
  try {
    // Parsing and validating the request body
    const body = registerSchema.safeParse(await req.json());

    // Handling validation errors
    if (!body.success) {
      return jsonResponse("Validation Error", 400);
    }

    const { username, email, password, recaptchaToken } = body.data;

    // Verifying the recaptcha token
    const isRecaptchaCorrect = verifyCaptcha(recaptchaToken);

    // Handling recaptcha verification failure
    if (!isRecaptchaCorrect) {
      return jsonResponse("Antibot system not passed", 400);
    }

    // Checking if a user with the provided email already exists
    const emailAlreadyTaken = await checkEmail(email);

    // Handling existing user with the provided email error
    if (emailAlreadyTaken) {
      return jsonResponse(
        {
          field: "email",
          message: "User with this email already exists",
        },
        400,
      );
    }

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

    // Creating a new user
    const data = await register(username, email, password);

    // Handling user creation error
    if (!data) {
      return jsonResponse("An error occurred while creating a new user", 400);
    }

    // Serializing jwt token
    const serialized = serializeJwt(data.jwt);

    // Returning a JSON response with user information and set cookie header
    return jsonResponse(data.user, 201, {
      headers: { "Set-Cookie": serialized },
    });
  } catch (error) {
    // Handling internal error
    console.log("[REGISTER_POST]", error);
    return jsonResponse("Internal Error", 500);
  }
}
