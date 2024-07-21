import { jsonResponse } from "@/lib/json-response";
import { ImageResponse } from "next/og";
import fs from "fs/promises";
import path from "path";
import sharp from "sharp";
import { getAppTitle } from "@/lib/get-app-title";
import type { NextRequest } from "next/server";
import type { ImageResponseOptions } from "next/dist/compiled/@vercel/og/types";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);

  const title = searchParams.get("title");
  const image = searchParams.get("image");

  if (!title) {
    return jsonResponse("Invalid Request", 400);
  }

  try {
    // Get options
    const options = await getOptions();

    // No image handling
    if (!image) {
      return new ImageResponse(
        (
          <div tw="flex items-center justify-center w-full h-full flex-col text-white bg-black">
            <div tw="text-3xl font-semibold">{getAppTitle()}</div>

            <div tw="text-[50px] mt-6 opacity-75">{title}</div>
          </div>
        ),
        options,
      );
    }

    // Get image data
    const imageData = await getImageData(image);

    return new ImageResponse(
      (
        <div tw="flex w-full h-full flex-col text-white bg-black">
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

          <div tw="flex flex-col p-6">
            <div tw="text-2xl font-semibold w-full">{getAppTitle()}</div>

            <div tw="text-4xl w-full mt-1 opacity-75">{title}</div>
          </div>
        </div>
      ),
      options,
    );
  } catch (error) {
    // Handling internal error
    console.log("[OG_GET]", error);
    return jsonResponse("Internal Error", 500);
  }
}

async function getImageData(src: string) {
  const imageBuffer = await fs.readFile(path.join(process.cwd(), src));
  const processedImage = await sharp(imageBuffer).rotate().toBuffer();
  return processedImage.toString("base64");
}

async function getOptions(): Promise<ImageResponseOptions> {
  const fontRegular = await fs.readFile(
    path.join(process.cwd(), "public/assets/fonts/Inter-Regular.ttf"),
  );
  const fontSemiBold = await fs.readFile(
    path.join(process.cwd(), "public/assets/fonts/Inter-SemiBold.ttf"),
  );

  return {
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
  };
}
