import type { NextRequest } from "next/server";
import { jsonResponse } from "@/lib/json-response";
import { editProfileSchema } from "@/lib/form-schema";
import { parseJsonFromFormData } from "@/lib/formdata-parser";
import { getAuthUser } from "@/lib/get-auth-user";
import { deleteImage, uploadImage } from "@/lib/upload-image";
import { updateUser } from "@/services/user";
import { reverseGeocode } from "@/lib/server-actions";

export async function PATCH(req: NextRequest) {
  try {
    // Parsing and validating the request body
    const data = parseJsonFromFormData(await req.formData());
    const body = editProfileSchema.safeParse(data);

    // Handling validation errors
    if (!body.success) {
      return jsonResponse("Validation Error", 400);
    }

    const { avatar, dateOfBirth, bio, coords, socialMedia } = body.data;

    const authUser = getAuthUser();

    if (avatar) {
      // Checking if the user has an existing avatar image
      if (authUser.avatar) {
        // Deleting the old avatar
        await deleteImage(authUser.avatar);
      }

      // Saving the new avatar image
      const avatarUrl = await uploadImage(avatar, "avatar");

      // Updating the user's avatar
      await updateUser(authUser.id, { avatar: avatarUrl });
    }

    // Reverse geocoding the coordinates
    const [lat, lng] = coords?.split(",").map(Number) || [];
    const { address } =
      lat && lng ? await reverseGeocode(lat, lng) : { address: undefined };
    const { country, city, village } = address || {};

    // Updating the user's info
    const user = await updateUser(authUser.id, {
      dateOfBirth: dateOfBirth || null,
      bio: bio || null,
      coords: coords || null,
      country: country || null,
      city: city || village || null,
      socialMedia: socialMedia || {},
    });

    // Returning a JSON response with user information
    return jsonResponse(user, 201);
  } catch (error) {
    // Handling internal error
    console.log("[USER_PATCH]", error);
    return jsonResponse("Internal Error", 500);
  }
}
