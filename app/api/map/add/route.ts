import type { NextRequest } from "next/server";
import { jsonResponse } from "@/lib/json-response";
import { markerSchema } from "@/lib/form-schema";
import { getAuthUser } from "@/lib/get-auth-user";
import { parseJsonFromFormData } from "@/lib/formdata-parser";
import { verifyCaptcha } from "@/lib/server-actions";
import { createMarker } from "@/services/marker";
import { uploadImage } from "@/lib/upload-image";

export async function POST(req: NextRequest) {
  try {
    // Parsing and validating the request body
    const reqData = parseJsonFromFormData(await req.formData());
    const body = markerSchema.safeParse(reqData);

    // Handling validation errors
    if (!body.success) {
      return jsonResponse("Validation Error", 400);
    }

    const { coords, address, images, recaptchaToken } = body.data;
    const [lat, lng] = coords.split(",").map(Number);

    // Verifying the recaptcha token
    const isRecaptchaCorrect = await verifyCaptcha(recaptchaToken);

    // Handling recaptcha verification failure
    if (!isRecaptchaCorrect) {
      return jsonResponse("Antibot system not passed", 400);
    }

    const authUser = getAuthUser();

    // Handling image upload
    const imagesUrl = [];

    for (const image of images as File[]) {
      const name = `${authUser.id}_${imagesUrl.length}`;
      const imageUrl = await uploadImage(image, "marker", name);
      imagesUrl.push(imageUrl);
    }

    // Adding a new marker
    const marker = await createMarker({
      lat,
      lng,
      address,
      images: JSON.stringify(imagesUrl),
      confirmed: authUser.role === "ADMIN",
      addedByUserId: authUser.id,
    });

    return jsonResponse(marker, 200);
  } catch (error) {
    // Handling internal error
    console.log("[MAP_ADD_POST]", error);
    return jsonResponse("Internal Error", 500);
  }
}
