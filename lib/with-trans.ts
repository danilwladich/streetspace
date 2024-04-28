"use client";

import { useTranslation } from "react-i18next";

export function withTrans(ns: string, key: string) {
  const { t } = useTranslation(ns);
  return t(key);
}
