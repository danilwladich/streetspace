import fs from "fs/promises";
import path from "path";

export async function uploadImage(image: File, dir: string, name: string) {
  const filepath = path.join(process.cwd(), "public/uploads", dir);

  // Create directory if it doesn't exist
  try {
    await fs.access(filepath);
  } catch {
    await fs.mkdir(filepath, { recursive: true });
  }

  // Reading and save the new article image
  const imageBuffer = Buffer.from(await image.arrayBuffer());
  const filename = `${Date.now()}_${name}_${image.name.replaceAll(" ", "_")}`;

  await fs.writeFile(path.join(filepath, filename), imageBuffer);

  return path.join("/uploads", dir, filename);
}

export async function deleteImage(url: string) {
  await fs.unlink(path.join(process.cwd(), "public", url));
}
