import { useTranslation } from "react-i18next";

export function useAppTranslation(prefix?: string) {
  return useTranslation("translation", {
    keyPrefix: prefix,
  });
}
