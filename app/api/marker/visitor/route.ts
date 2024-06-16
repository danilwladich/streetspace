import type { NextRequest } from "next/server";
import { jsonResponse } from "@/lib/json-response";
import { getAuthUser } from "@/lib/get-auth-user";
import {
  createMarkerVisitor,
  deleteMarkerVisitor,
} from "@/services/marker-visitor";

export async function POST(req: NextRequest) {
  try {
    const { id } = await req.json();

    // Check if the marker id is provided
    if (!id) {
      return jsonResponse("Invalid Request", 400);
    }

    const authUser = getAuthUser();

    // Create marker visitor
    await createMarkerVisitor(id, authUser.id);

    return jsonResponse("Location added to users visits successfully", 201);
  } catch (error) {
    // Handling internal error
    console.log("[MARKER_VISITOR_POST]", error);
    return jsonResponse("Internal Error", 500);
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { id } = await req.json();

    // Check if the marker id is provided
    if (!id) {
      return jsonResponse("Invalid Request", 400);
    }

    const authUser = getAuthUser();

    // Delete marker visitor
    await deleteMarkerVisitor(id, authUser.id);

    return jsonResponse("Location removed from users visits successfully", 201);
  } catch (error) {
    // Handling internal error
    console.log("[MARKER_VISITOR_DELETE]", error);
    return jsonResponse("Internal Error", 500);
  }
}
