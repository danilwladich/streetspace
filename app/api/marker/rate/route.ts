import type { NextRequest } from "next/server";
import { jsonResponse } from "@/lib/json-response";
import { getAuthUser } from "@/lib/get-auth-user";
import { createMarkerRate, updateMarkerRate } from "@/services/marker-rate";

export async function POST(req: NextRequest) {
  try {
    const { id, rate } = await req.json();

    // Check if the marker id and rate is provided
    if (!id || !rate) {
      return jsonResponse("Invalid Request", 400);
    }

    const authUser = getAuthUser();

    // Create marker visitor
    await createMarkerRate(id, authUser.id, rate);

    return jsonResponse("Rate added to marker successfully", 201);
  } catch (error) {
    // Handling internal error
    console.log("[MARKER_RATE_POST]", error);
    return jsonResponse("Internal Error", 500);
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const { id, rate } = await req.json();

    // Check if the marker id and rate is provided
    if (!id || !rate) {
      return jsonResponse("Invalid Request", 400);
    }

    const authUser = getAuthUser();

    // Delete marker rate
    await updateMarkerRate(id, authUser.id, rate);

    return jsonResponse("Rate updated successfully", 201);
  } catch (error) {
    // Handling internal error
    console.log("[MARKER_RATE_PATCH]", error);
    return jsonResponse("Internal Error", 500);
  }
}
