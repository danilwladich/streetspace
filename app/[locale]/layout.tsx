import { Inter } from "next/font/google";
import { getAppTitle } from "@/lib/get-app-title";
import { NextIntlClientProvider, useMessages } from "next-intl";
import { getTranslations } from "next-intl/server";
import { locales, defaultLocale } from "@/i18n";
import { GoogleAnalytics } from "@next/third-parties/google";
import type { Metadata, Viewport } from "next";
import "./globals.css";

import { ThemeProvider } from "@/components/providers/theme-provider";
import { AuthProvider } from "@/components/providers/auth-provider";
import { ModalProvider } from "@/components/providers/modal-provider";
import { Toaster } from "@/components/ui/sonner";

const font = Inter({ subsets: ["latin"] });

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const t = await getTranslations("metadata");

  const title = getAppTitle();
  const description = t("description");

  const languages = Object.assign(
    {},
    ...locales.map((locale) => ({
      [locale]: locale === defaultLocale ? "/" : `/${locale}`,
    })),
  );

  const metadataBase = new URL(process.env.NEXT_PUBLIC_URL_BASE || "");

  return {
    title,
    description,
    keywords:
      "street workout, workout, street, streetspace, map, streetworkout, карта стритворкаута, карта, стритворкаута, стритворкаут, стрит, уличный спорт, уличный, спорт, карта street workout, street workout карта, mapa streetworkout, mapa, street workout mapa, калистеника, карта калистеники, kalistenika, calisthenics, calisthenics map",
    applicationName: title,
    authors: [
      { name: "Daniel Władyczewski", url: "https://github.com/danilwladich" },
    ],
    creator: "Daniel Władyczewski",
    icons: [
      {
        rel: "apple-touch-icon",
        url: "/favicon/apple-touch-icon.png",
        sizes: "180x180",
      },
      {
        rel: "icon",
        url: "/favicon/favicon-32x32.png",
        sizes: "32x32",
        type: "image/png",
      },
      {
        rel: "icon",
        url: "/favicon/favicon-16x16.png",
        sizes: "16x16",
        type: "image/png",
      },
    ],
    openGraph: {
      type: "website",
      locale,
      siteName: title,
      title,
      description,
    },
    metadataBase,
    alternates: {
      canonical: "/",
      languages,
    },
  };
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const messages = useMessages();

  return (
    <html lang={locale}>
      <body className={font.className}>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <ThemeProvider>
            <AuthProvider>
              <ModalProvider />
              <Toaster />
              {children}
            </AuthProvider>
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
      <GoogleAnalytics gaId="G-XBDZS8Z669" />
    </html>
  );
}
