import { jsonResponse } from "@/lib/json-response";
import { ImageResponse } from "next/og";
import fs from "fs/promises";
import path from "path";
import sharp from "sharp";
import { getAppTitle } from "@/lib/get-app-title";
import type { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);

  const title = searchParams.get("title");
  const image = searchParams.get("image");

  if (!title || !image) {
    return jsonResponse("Invalid Request", 400);
  }

  try {
    // Read the font files
    const fontRegular = await fs.readFile(
      path.join(process.cwd(), "public/assets/fonts/Inter-Regular.ttf"),
    );
    const fontSemiBold = await fs.readFile(
      path.join(process.cwd(), "public/assets/fonts/Inter-SemiBold.ttf"),
    );

    // Read the image file
    const imageBuffer = await fs.readFile(path.join(process.cwd(), image));
    const processedImage = await sharp(imageBuffer).rotate().toBuffer();
    const imageData = processedImage.toString("base64");

    return new ImageResponse(
      (
        <div tw="flex w-full h-full relative flex-col text-white bg-black">
          <img // eslint-disable-line
            src={`data:image/jpeg;base64,${imageData}`}
            alt={title}
            width={1200}
            height={630}
            tw="w-full h-full flex-1"
            style={{
              objectFit: "cover",
            }}
          />

          <div tw="flex flex-col gap-4 p-6">
            <div tw="text-2xl font-semibold w-full text-center">
              {getAppTitle()}
            </div>

            <div tw="text-4xl w-full text-center opacity-75">{title}</div>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
        fonts: [
          {
            name: "Inter",
            data: fontRegular,
            style: "normal",
            weight: 400,
          },
          {
            name: "Inter",
            data: fontSemiBold,
            style: "normal",
            weight: 600,
          },
        ],
      },
    );
  } catch (error) {
    // Handling internal error
    console.log("[OG_GET]", error);
    return jsonResponse("Internal Error", 500);
  }
}
