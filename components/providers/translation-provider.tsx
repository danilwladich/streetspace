"use client";

import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import en from "@/locales/en.json";
import pl from "@/locales/pl.json";

const resources = {
  en,
  pl,
} as const;

export const languages = ["en", "pl"] as const;
const defaultLang = "en";

export function getInitialLang() {
  if (typeof window === "undefined") {
    return defaultLang;
  }

  const storageLang = localStorage.getItem("lang") as
    | (typeof languages)[number]
    | null;

  if (storageLang && languages.includes(storageLang)) {
    return storageLang;
  }

  return navigator.language;
}

i18n.use(initReactI18next).init({
  resources,
  lng: getInitialLang(),
  fallbackLng: defaultLang,
});

export function TranslationProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
