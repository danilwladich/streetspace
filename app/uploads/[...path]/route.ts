import { NextResponse, type NextRequest } from "next/server";
import { jsonResponse } from "@/lib/json-response";
import { readImage } from "@/lib/upload-image";

export async function GET(req: NextRequest) {
  try {
    const pathname = req.nextUrl.pathname;
    const image = await readImage(pathname);

    if (!image) {
      return jsonResponse("Not Found", 404);
    }

    return new NextResponse(image, {
      status: 200,
      headers: {
        "Content-Type": "image/jpeg",
      },
    });
  } catch (error) {
    // Handling internal error
    console.log("[UPLOADS_GET]", error);
    return jsonResponse("Internal Error", 500);
  }
}
