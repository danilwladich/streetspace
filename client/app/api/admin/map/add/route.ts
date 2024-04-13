import type { NextRequest } from "next/server";
import { jsonResponse } from "@/lib/json-response";
import { confirmMarker, deleteMarker } from "@/lib/server-actions";

export async function PATCH(req: NextRequest) {
  try {
    const { id } = await req.json();

    if (!id) {
      return jsonResponse("Invalid Request", 400);
    }

    const isSuccess = await confirmMarker(id);

    if (!isSuccess) {
      return jsonResponse("Invalid Request", 400);
    }

    return jsonResponse("Success", 200);
  } catch (error) {
    // Handling internal error
    console.log("[ADMIN_MAP_ADD_PATCH]", error);
    return jsonResponse("Internal Error", 500);
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { id } = await req.json();

    if (!id) {
      return jsonResponse("Invalid Request", 400);
    }

    const isSuccess = await deleteMarker(id);

    if (!isSuccess) {
      return jsonResponse("Invalid Request", 400);
    }

    return jsonResponse("Success", 200);
  } catch (error) {
    // Handling internal error
    console.log("[ADMIN_MAP_ADD_DELETE]", error);
    return jsonResponse("Internal Error", 500);
  }
}
