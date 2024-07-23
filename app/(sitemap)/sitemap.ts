import { MetadataRoute } from "next";
import { locales, defaultLocale } from "@/i18n";

const base = process.env.NEXT_PUBLIC_URL_BASE;

export function getUrl(
  path: string = "",
  lastModified: Date = new Date(),
): MetadataRoute.Sitemap[number] {
  const languages = Object.assign(
    {},
    ...locales
      .filter((locale) => locale !== defaultLocale)
      .map((locale) => ({
        [locale]: `${base}/${locale}${path}`,
      })),
  );

  return {
    url: `${base}${path}`,
    lastModified,
    alternates: {
      languages,
    },
  };
}

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    getUrl(),
    getUrl("/auth"),
    getUrl("/auth/register"),
    getUrl("/settings"),
  ];
}
