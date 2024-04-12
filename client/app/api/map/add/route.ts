import type { NextRequest } from "next/server";
import { jsonResponse } from "@/lib/json-response";
import { addMarker, verifyCaptcha } from "@/lib/server-actions";
import { markerSchema } from "@/lib/form-schema";
import { getAuthUser } from "@/lib/get-auth-user";
import { parseJsonFromFormData } from "@/lib/formdata-parser";

export async function POST(req: NextRequest) {
  try {
    // Parsing and validating the request body
    const reqData = parseJsonFromFormData(await req.formData());
    const body = markerSchema.safeParse(reqData);

    // Handling validation errors
    if (!body.success) {
      return jsonResponse("Validation Error", 400);
    }

    const { name, coords, address, images, recaptchaToken } = body.data;
    const [lat, lng] = coords.split(",");

    // Verifying the recaptcha token
    const isRecaptchaCorrect = verifyCaptcha(recaptchaToken);

    // Handling recaptcha verification failure
    if (!isRecaptchaCorrect) {
      return jsonResponse("Antibot system not passed", 400);
    }

    const authUser = getAuthUser(req);

    // Adding a new marker
    const markerId = await addMarker({
      name,
      lat,
      lng,
      address,
      images,
      userId: authUser.id,
    });

    if (!markerId) {
      return jsonResponse("An error occurred while adding a marker", 400);
    }

    return jsonResponse(markerId, 200);
  } catch (error) {
    // Handling internal error
    console.log("[MAP_ADD_POST]", error);
    return jsonResponse("Internal Error", 500);
  }
}
