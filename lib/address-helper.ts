import type { Prisma } from "@prisma/client";

export function addressToString(value: Prisma.JsonValue): string {
  if (
    !(
      typeof value === "object" &&
      value !== null &&
      "road" in value &&
      "city" in value &&
      "postcode" in value &&
      "country" in value
    )
  ) {
    return "";
  }

  const { road, city, postcode, country } = value;

  return `${road}, ${city}, ${postcode}, ${country}`;
}
