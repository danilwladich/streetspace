import fs from "fs/promises";
import path from "path";
import sharp from "sharp";

export async function uploadImage(image: File, dir: string, name: string) {
  const filepath = path.join(process.cwd(), "public/uploads", dir);

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

  const filename = `${Date.now()}_${name}_${image.name.replaceAll(/\s|\./g, "_")}`;

  // Saving image to disk
  await fs.writeFile(path.join(filepath, filename), optimizedBuffer);

  // Return image path
  return path.join("/uploads", dir, filename);
}

export async function deleteImage(url: string) {
  await fs.unlink(path.join(process.cwd(), "public", url));
}
