import i18n from "i18next";
import { create } from "zustand";
import { getInitialLang } from "@/components/providers/translation-provider";

interface LanguageStore {
  lang: string;
  setLang: (lang: string) => void;
}

export const useLanguageStore = create<LanguageStore>((set) => ({
  lang: getInitialLang(),
  setLang: (lang) => {
    localStorage.setItem("lang", lang);
    i18n.changeLanguage(lang);
    set({ lang });
  },
}));
