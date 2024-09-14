import type { NextRequest } from "next/server";
import { registerSchema } from "@/lib/form-schema";
import bcrypt from "bcryptjs";
import { verifyCaptcha } from "@/lib/server-actions";
import { jsonResponse } from "@/lib/json-response";
import { checkEmail, checkUsername, createUser } from "@/services/user";
import { checkToken, createToken } from "@/services/sign-up-token";
import { sendMail } from "@/services/mail";
import { ConfirmSignUpEmail } from "@/components/common/emails/confirm-sign-up-email";

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

    // Checking if a token was already sent to the provided email
    const tokenAlreadySent = await checkToken({ email });

    // Handling token already sent error
    if (tokenAlreadySent) {
      return jsonResponse(
        {
          field: "email",
          message: "Waiting for email confirmation",
        },
        400,
      );
    }

    // Checking if a user with the provided email already exists
    const userAlreadyExist = await checkEmail(email);

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

    // Hashing the password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Creating a new unconfirmed user
    const user = await createUser({
      username,
      email,
      password: hashedPassword,
    });

    const { token } = await createToken(user.id);

    await sendMail({
      to: email,
      subject: "Confirm sign up | streetspace",
      html: ConfirmSignUpEmail({ token, email }),
    });

    // Returning a JSON response with user
    return jsonResponse("User", 201);
  } catch (error) {
    // Handling internal error
    console.log("[REGISTER_POST]", error);
    return jsonResponse("Internal Error", 500);
  }
}
