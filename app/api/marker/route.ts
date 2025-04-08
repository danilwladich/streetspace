import type { NextRequest } from "next/server";
import { jsonResponse } from "@/lib/json-response";
import { markerSchema } from "@/lib/form-schema";
import { getAuthUser } from "@/lib/get-auth-user";
import { parseJsonFromFormData } from "@/lib/formdata-parser";
import { reverseGeocode, verifyCaptcha } from "@/lib/server-actions";
import { checkMarkerDuplicate, createMarker } from "@/services/marker";
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

    const { coords, images, recaptchaToken } = body.data;

    // Verifying the recaptcha token
    const isRecaptchaCorrect = await verifyCaptcha(recaptchaToken);

    // Handling recaptcha verification failure
    if (!isRecaptchaCorrect) {
      return jsonResponse("Antibot system not passed", 400);
    }

    // Checking if the marker is already added
    const [lat, lng] = coords.split(",").map(Number);
    const isAlreadyAdded = await checkMarkerDuplicate(lat, lng);

    if (isAlreadyAdded) {
      return jsonResponse(
        "The location has already been added or sent for moderation",
        400,
      );
    }

    // Reverse geocoding the coordinates
    const { address, success } = await reverseGeocode(lat, lng);

    if (!success || !address) {
      return jsonResponse("Invalid coordinates", 400);
    }

    const { road, city, village, postcode, country } = address;

    const authUser = getAuthUser();

    // Handling image upload
    const imagesUrl = [];

    for (const image of images as File[]) {
      const imageUrl = await uploadImage(image, "marker");
      imagesUrl.push(imageUrl);
    }

    // Adding a new marker
    const marker = await createMarker({
      lat,
      lng,
      address: {
        road,
        city: city || village || "",
        postcode,
        country,
      },
      images: imagesUrl,
      confirmed: authUser.role === "ADMIN",
      addedByUserId: authUser.id,
    });

    return jsonResponse(marker, 200);
  } catch (error) {
    // Handling internal error
    console.log("[MARKER_ADD_POST]", error);
    return jsonResponse("Internal Error", 500);
  }
}
