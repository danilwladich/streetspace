import { notFound } from "next/navigation";
import { getRequestConfig } from "next-intl/server";

export const defaultLocale = "en" as const;
export const locales = ["en", "pl"] as const;
export const localePrefix = "as-needed";

export default getRequestConfig(async ({ locale }) => {
  if (!locales.includes(locale as any)) notFound();

  return {
    messages: (await import(`/public/locales/${locale}.json`)).default,
  };
});
