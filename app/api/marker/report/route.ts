import type { NextRequest } from "next/server";
import { jsonResponse } from "@/lib/json-response";
import { reportMarkerSchema } from "@/lib/form-schema";
import { getAuthUser } from "@/lib/get-auth-user";
import { upsertMarkerReport } from "@/services/marker";

export async function POST(req: NextRequest) {
  try {
    // Parsing and validating the request body
    const { id, ...reqBody } = await req.json();
    const body = reportMarkerSchema.safeParse(reqBody);

    // Handling validation errors
    if (!body.success || !id) {
      return jsonResponse("Validation Error", 400);
    }

    const { type, message } = body.data;

    const authUser = getAuthUser();

    const markerReport = await upsertMarkerReport({
      markerId: id,
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
