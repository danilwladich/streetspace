import type { NextRequest } from "next/server";
import { jsonResponse } from "@/lib/json-response";
import { deleteMarker, getMarkerById } from "@/services/marker";
import { deleteImage } from "@/lib/upload-image";

export async function DELETE(req: NextRequest) {
  try {
    const { id } = await req.json();

    if (!id) {
      return jsonResponse("Invalid Request", 400);
    }

    const marker = await getMarkerById(id);

    if (!marker) {
      return jsonResponse("Invalid Request", 400);
    }

    const images = JSON.parse(marker.images) as string[];

    for (const imageUrl of images) {
      await deleteImage(imageUrl);
    }

    await deleteMarker(id);

    return jsonResponse("Success", 200);
  } catch (error) {
    // Handling internal error
    console.log("[ADMIN_MARKER_DELETE]", error);
    return jsonResponse("Internal Error", 500);
  }
}
