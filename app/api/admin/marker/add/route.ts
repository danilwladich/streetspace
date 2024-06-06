import type { NextRequest } from "next/server";
import { jsonResponse } from "@/lib/json-response";
import { updateMarker } from "@/services/marker";

export async function PATCH(req: NextRequest) {
  try {
    const { id } = await req.json();

    if (!id) {
      return jsonResponse("Invalid Request", 400);
    }

    const marker = await updateMarker(id, { confirmed: true });

    return jsonResponse(marker, 200);
  } catch (error) {
    // Handling internal error
    console.log("[ADMIN_MARKER_ADD_PATCH]", error);
    return jsonResponse("Internal Error", 500);
  }
}
