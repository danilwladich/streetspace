import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const base64Encode = (str: string) =>
  Buffer.from(str, "utf8").toString("base64");

export function sanitizeHeader(json: Record<string, any>) {
  for (const key in json) {
    const value = json[key];
    // Convert to base64 if non-ASCII characters are found
    json[key] = /[\x80-\uFFFF]/.test(value) ? base64Encode(value) : value;
  }
  return json;
}
