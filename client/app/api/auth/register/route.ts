import type { NextRequest } from "next/server";
import { registerSchema } from "@/lib/form-schema";
import bcrypt from "bcryptjs";
import { verifyCaptcha } from "@/lib/server-actions";
import { jsonResponse } from "@/lib/json-response";
import { serializeJwt } from "@/lib/serialize-jwt";
import { createUser, getUserByEmail, getUserByUsername } from "@/services/user";

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
    const isRecaptchaCorrect = await verifyCaptcha(recaptchaToken);

    // Handling recaptcha verification failure
    if (!isRecaptchaCorrect) {
      return jsonResponse("Antibot system not passed", 400);
    }

    // Checking if a user with the provided email already exists
    const userAlreadyExist = !!(await getUserByEmail(email));

    // Handling existing user with the provided email error
    if (userAlreadyExist) {
      return jsonResponse(
        {
          field: "email",
          message: "User with this email already exists",
        },
        400,
      );
    }

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

    // Hashing the password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Creating a new user
    const user = await createUser({
      username,
      email,
      password: hashedPassword,
    });

    // Serializing the user object into a JWT token
    const serialized = await serializeJwt(user);

    // Returning a JSON response with user information and set cookie header
    return jsonResponse(user, 201, {
      headers: { "Set-Cookie": serialized },
    });
  } catch (error) {
    // Handling internal error
    console.log("[REGISTER_POST]", error);
    return jsonResponse("Internal Error", 500);
  }
}
