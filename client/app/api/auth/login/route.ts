import type { NextRequest } from "next/server";
import { loginSchema } from "@/lib/form-schema";
import { verifyCaptcha } from "@/lib/server-actions";
import { jsonResponse } from "@/lib/json-response";
import { serializeJwt } from "@/lib/serialize-jwt";

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
    const isRecaptchaCorrect = verifyCaptcha(recaptchaToken);

    // Handling recaptcha verification failure
    if (!isRecaptchaCorrect) {
      return jsonResponse("Antibot system not passed", 400);
    }

    // Checking whether the provided identifier is an email or username
    const itsEmail = emailOrUsername.includes("@");

    // Fetching the user from the database
    const res = await fetch(`${process.env.STRAPI_URL}/api/auth/local`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        identifier: emailOrUsername,
        password,
      }),
    });
    const data = await res.json();

    // Handling non-existent user error
    if (data.error) {
      return jsonResponse(
        {
          field: "password",
          message: `Incorrect ${itsEmail ? "email" : "username"} or password`,
        },
        400,
      );
    }

    // Serializing jwt token
    const serialized = await serializeJwt(data.jwt);

    // Returning a JSON response with user information and set cookie header
    return jsonResponse(data.user, 200, {
      headers: { "Set-Cookie": serialized },
    });
  } catch (error) {
    // Handling internal error
    console.log("[LOGIN_POST]", error);
    return jsonResponse("Internal Error", 500);
  }
}
