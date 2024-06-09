import type { NextRequest } from "next/server";
import { jsonResponse } from "@/lib/json-response";
import { markerReportSchema } from "@/lib/form-schema";
import { getAuthUser } from "@/lib/get-auth-user";
import { upsertMarkerReport } from "@/services/marker";

export async function POST(req: NextRequest) {
  try {
    // Parsing and validating the request body
    const body = markerReportSchema.safeParse(await req.json());

    // Handling validation errors
    if (!body.success) {
      return jsonResponse("Validation Error", 400);
    }

    const { markerId, type, message } = body.data;

    const authUser = getAuthUser();

    const markerReport = await upsertMarkerReport({
      markerId,
      reportedByUserId: authUser.id,
      type,
      message,
    });

    return jsonResponse(markerReport, 201);
  } catch (error) {
    // Handling internal error
    console.log("[MARKER_REPORT_POST]", error);
    return jsonResponse("Internal Error", 500);
  }
}
