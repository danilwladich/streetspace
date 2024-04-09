import type { StrapiImage } from "@/types/StrapiImage";

type Format = "thumbnail" | "small" | "medium" | "large";
const formats: Format[] = ["thumbnail", "small", "medium", "large"];

export function getImageUrl(image: StrapiImage, format?: Format): string {
  if (!format) {
    return image.url;
  }

  let index = formats.indexOf(format);

  while (index < formats.length) {
    const key = formats[index];
    const url = image.formats[key].url;

    if (url) {
      return url;
    }

    index++;
  }

  return image.url;
}
