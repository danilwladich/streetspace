import { defaultLocale, locales } from "@/i18n";
import type { Metadata } from "next";

const APP_TITLE = "streetspace";
const URL_BASE = new URL(process.env.NEXT_PUBLIC_URL_BASE || "");

export function getPageMetadata({
  path,
  pageName,
  titleToLower = true,
  description,
  image,
  locale,
  robots = true,
}: {
  path?: string;
  pageName: string;
  titleToLower?: boolean;
  description?: string;
  image?: string | null;
  locale?: string;
  robots?: boolean;
}): Metadata {
  // Generate title
  const title = getAppTitle(pageName, titleToLower);

  // Generate no robots metadata
  if (!robots) {
    return {
      title,
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  // Generate alternate links for all locales
  const languages = Object.assign(
    {},
    ...locales
      .filter((locale) => locale !== defaultLocale)
      .map((locale) => ({
        [locale]: `/${locale}${path}`,
      })),
  );
  // Generate open graph images
  const images = getOpenGraphImages(pageName, image);

  // Metadata
  return {
    title,
    description,
    openGraph: {
      type: "website",
      siteName: getAppTitle(),
      title,
      images,
      description,
      locale,
    },
    alternates: {
      canonical: path,
      languages,
    },
    metadataBase: URL_BASE,
    applicationName: getAppTitle(),
  };
}

export function getAppTitle(pageName: string = "", toLower: boolean = true) {
  if (toLower) {
    pageName = pageName.toLowerCase();
  }

  if (pageName) {
    return `${pageName} | ${APP_TITLE}`;
  }

  return APP_TITLE;
}

export function getOpenGraphImages(title: string, image?: string | null) {
  const url = new URL("/api/og", URL_BASE);

  url.searchParams.set("title", title);
  if (image) {
    url.searchParams.set("image", image);
  }

  return [
    {
      url,
      width: 1200,
      height: 630,
      alt: title,
    },
  ];
}
