"use client";

import i18n from "i18next";
import { initReactI18next, useTranslation } from "react-i18next";
import { useLayoutEffect } from "react";

import settingsEn from "@/public/locales/en/settings.json";
import settingsPl from "@/public/locales/pl/settings.json";
import formsEn from "@/public/locales/en/forms.json";
import formsPl from "@/public/locales/pl/forms.json";
import validationEn from "@/public/locales/en/validation.json";
import validationPl from "@/public/locales/pl/validation.json";
import layoutEn from "@/public/locales/en/layout.json";
import layoutPl from "@/public/locales/pl/layout.json";

const resources = {
  en: {
    settings: settingsEn,
    forms: formsEn,
    validation: validationEn,
    layout: layoutEn,
  },
  pl: {
    settings: settingsPl,
    forms: formsPl,
    validation: validationPl,
    layout: layoutPl,
  },
};

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
  const { i18n } = useTranslation();

  useLayoutEffect(() => {
    const html = document.documentElement;
    html.setAttribute("lang", i18n.language);
  }, [i18n.language]);

  return children;
}
