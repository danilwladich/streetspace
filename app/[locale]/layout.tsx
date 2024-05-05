import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { AuthProvider } from "@/components/providers/auth-provider";
import { ModalProvider } from "@/components/providers/modal-provider";
import { Toaster } from "@/components/ui/sonner";
import { getAppTitle } from "@/lib/get-app-title";
import { NextIntlClientProvider, useMessages } from "next-intl";

const font = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: getAppTitle(),
  description: "Streetspace union",
  keywords:
    "street workout, workout, street, streetspace, street workout map, map, streetworkout",
  authors: [
    { name: "Daniel Władyczewski", url: "https://github.com/danilwladich" },
  ],
  icons: [
    {
      rel: "icon",
      url: "/icon?<generated>",
      sizes: "32x32",
      type: "image/png",
    },
  ],
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
    </html>
  );
}
