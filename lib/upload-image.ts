import fs from "fs/promises";
import path from "path";
import sharp from "sharp";
import { nanoid } from "nanoid";

export async function uploadImage(image: File, dir: string) {
  const filepath = path.join(process.cwd(), "uploads", dir);

  // Create directory if it doesn't exist
  try {
    await fs.access(filepath);
  } catch {
    await fs.mkdir(filepath, { recursive: true });
  }

  // Reading image buffer and optimizing it
  const imageBuffer = Buffer.from(await image.arrayBuffer());
  const optimizedBuffer = await sharp(imageBuffer)
    .withMetadata()
    .resize(1200, 1200, { fit: "inside", withoutEnlargement: true })
    .jpeg()
    .toBuffer();

  const filename = `${Date.now()}_${nanoid()}.jpeg`;

  // Saving image to disk
  await fs.writeFile(path.join(filepath, filename), optimizedBuffer);

  // Return image path
  return path.join("/uploads", dir, filename);
}

export async function readImage(pathname: string) {
  try {
    return await fs.readFile(path.join(process.cwd(), pathname));
  } catch {
    return null;
  }
}

export async function deleteImage(pathname: string) {
  try {
    await fs.unlink(path.join(process.cwd(), pathname));
  } catch {}
}
