import type { NextRequest } from "next/server";
import { jsonResponse } from "@/lib/json-response";
import { getMarkers } from "@/lib/server-actions";
import { getMarkersSchema } from "@/lib/form-schema";

export async function GET(req: NextRequest) {
  try {
    const latMin = req.nextUrl.searchParams.get("latMin");
    const latMax = req.nextUrl.searchParams.get("latMax");
    const lngMin = req.nextUrl.searchParams.get("lngMin");
    const lngMax = req.nextUrl.searchParams.get("lngMax");

    const body = getMarkersSchema.safeParse({ latMin, latMax, lngMin, lngMax });

    if (!body.success) {
      return jsonResponse("Validation Error", 400);
    }

    const data = await getMarkers(body.data);

    if (!data) {
      return jsonResponse("An error occurred while fetching a markers ", 400);
    }

    return jsonResponse(data, 200);
  } catch (error) {
    // Handling internal error
    console.log("[MAP_GET]", error);
    return jsonResponse("Internal Error", 500);
  }
}
