import type { NextRequest } from "next/server";
import { editAvatarSchema } from "@/lib/form-schema";
import { jsonResponse } from "@/lib/json-response";
import { getAuthUser } from "@/lib/get-auth-user";
import { parseJsonFromFormData } from "@/lib/formdata-parser";
import { changeAvatar, deleteAvatar } from "@/lib/server-actions";

export async function PATCH(req: NextRequest) {
  try {
    // Parsing and validating the request body
    const data = parseJsonFromFormData(await req.formData());
    const body = editAvatarSchema.safeParse(data);

    // Handling validation errors
    if (!body.success) {
      return jsonResponse("Validation Error", 400);
    }

    const { image } = body.data as { image: File };

    const authUser = getAuthUser(req);

    // Checking if the user has an existing avatar image
    if (authUser.avatar) {
      // Deleting the old avatar
      const { id } = authUser.avatar;
      const isSuccess = await deleteAvatar(id);

      if (!isSuccess) {
        return jsonResponse(
          "An error occurred while deleting an old avatar",
          400,
        );
      }
    }

    // Updating the user's avatar
    const user = await changeAvatar(authUser.id, image);

    if (!user) {
      return jsonResponse("An error occurred while changing the avatar", 400);
    }

    // Returning a JSON response with user information
    return jsonResponse(user, 200);
  } catch (error) {
    // Handling internal error
    console.log("[USER_AVATAR_PATCH]", error);
    return jsonResponse("Internal Error", 500);
  }
}
