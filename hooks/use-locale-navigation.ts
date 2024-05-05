import { localePrefix, locales } from "@/i18n";
import { createLocalizedPathnamesNavigation } from "next-intl/navigation";

export function useLocaleNavigation() {
  return createLocalizedPathnamesNavigation({
    locales,
    pathnames: { "/": "/" },
    localePrefix,
  });
}
