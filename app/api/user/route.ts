import type { NextRequest } from "next/server";
import { jsonResponse } from "@/lib/json-response";
import { editProfileSchema } from "@/lib/form-schema";
import { parseJsonFromFormData } from "@/lib/formdata-parser";
import { getAuthUser } from "@/lib/get-auth-user";
import { deleteImage, uploadImage } from "@/lib/upload-image";
import { getUserById, updateUser } from "@/services/user";
import { serializeJwt } from "@/lib/serialize-jwt";

export async function PATCH(req: NextRequest) {
  try {
    // Parsing and validating the request body
    const data = parseJsonFromFormData(await req.formData());
    const body = editProfileSchema.safeParse({
      ...data,
      socialMedia: JSON.parse(data.socialMedia || "{}"),
    });

    // Handling validation errors
    if (!body.success) {
      return jsonResponse("Validation Error", 400);
    }

    const { avatar, dateOfBirth, bio, country, city, socialMedia } = body.data;

    const authUser = getAuthUser();

    if (avatar) {
      // Checking if the user has an existing avatar image
      if (authUser.avatar) {
        // Deleting the old avatar
        await deleteImage(authUser.avatar);
      }

      // Saving the new avatar image
      const avatarUrl = await uploadImage(avatar, "avatar", authUser.id);

      // Updating the user's avatar
      await updateUser(authUser.id, { avatar: avatarUrl });
    }

    // Updating the user's info
    const user = await updateUser(authUser.id, {
      dateOfBirth: dateOfBirth ? new Date(dateOfBirth) : null,
      bio: bio || null,
      country: country || null,
      city: city || null,
      socialMedia: JSON.stringify(socialMedia || {}),
    });

    const serialized = await serializeJwt(user);

    // Returning a JSON response with user information and set cookie header
    return jsonResponse(user, 200, {
      headers: { "Set-Cookie": serialized },
    });
  } catch (error) {
    // Handling internal error
    console.log("[USER_PATCH]", error);
    return jsonResponse("Internal Error", 500);
  }
}
