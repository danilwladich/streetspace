import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { AuthProvider } from "@/components/providers/auth-provider";
import { ModalProvider } from "@/components/providers/modal-provider";
import { Toaster } from "@/components/ui/sonner";
import { getAppTitle } from "@/lib/get-app-title";
import { NextIntlClientProvider, useMessages } from "next-intl";
import { getTranslations } from "next-intl/server";

const font = Inter({ subsets: ["latin"] });

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("metadata");

  return {
    title: getAppTitle(),
    description: t("description"),
    keywords:
      "street workout, workout, street, streetspace, street workout map, map, streetworkout",
    authors: [
      { name: "Daniel Władyczewski", url: "https://github.com/danilwladich" },
    ],
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
  };
}

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
    </html>
  );
}
