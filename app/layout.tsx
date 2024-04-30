import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { TranslationProvider } from "@/components/providers/translation-provider";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { AuthProvider } from "@/components/providers/auth-provider";
import { ModalProvider } from "@/components/providers/modal-provider";
import { Toaster } from "@/components/ui/sonner";
import { getAppTitle } from "@/lib/get-app-title";

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
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={font.className}>
        <ThemeProvider>
          <TranslationProvider>
            <AuthProvider>
              <ModalProvider />
              <Toaster />
              {children}
            </AuthProvider>
          </TranslationProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
