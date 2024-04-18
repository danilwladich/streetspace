import type { NextRequest } from "next/server";
import { jsonResponse } from "@/lib/json-response";
import { getMarkersSchema } from "@/lib/form-schema";
import { getMarkers } from "@/services/marker";

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
    
    return jsonResponse(data, 200);
  } catch (error) {
    // Handling internal error
    console.log("[MAP_GET]", error);
    return jsonResponse("Internal Error", 500);
  }
}
