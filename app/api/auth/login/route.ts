import type { NextRequest } from "next/server";
import { loginSchema } from "@/lib/form-schema";
import bcrypt from "bcryptjs";
import { verifyCaptcha } from "@/lib/server-actions";
import { jsonResponse } from "@/lib/json-response";
import { serializeJwt } from "@/lib/serialize-jwt";
import { getUserByEmail, getUserByUsername } from "@/services/user";

export async function POST(req: NextRequest) {
  try {
    // Parsing and validating the request body
    const body = loginSchema.safeParse(await req.json());

    // Handling validation errors
    if (!body.success) {
      return jsonResponse("Validation Error", 400);
    }

    const { emailOrUsername, password, recaptchaToken } = body.data;

    // Verifying the recaptcha token
    const isRecaptchaCorrect = await verifyCaptcha(recaptchaToken);

    // Handling recaptcha verification failure
    if (!isRecaptchaCorrect) {
      return jsonResponse("Antibot system not passed", 400);
    }

    // Checking whether the provided identifier is an email or username
    const itsEmail = emailOrUsername.includes("@");

    // Fetching the user from the database
    const user = itsEmail
      ? await getUserByEmail(emailOrUsername)
      : await getUserByUsername(emailOrUsername);

    // Handling non-existent user error
    if (!user) {
      return jsonResponse(
        {
          field: "password",
          message: `Incorrect ${itsEmail ? "email" : "username"} or password`,
        },
        400,
      );
    }

    // Comparing the provided password with the hashed password
    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    // Handling incorrect password error
    if (!isPasswordCorrect) {
      return jsonResponse(
        {
          field: "password",
          message: `Incorrect ${itsEmail ? "email" : "username"} or password`,
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
    console.log("[LOGIN_POST]", error);
    return jsonResponse("Internal Error", 500);
  }
}
