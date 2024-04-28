"use client";

import { useTranslation } from "react-i18next";

export function WithTrans({ ns, k }: { ns: string; k: string }) {
  const { t } = useTranslation(ns);
  return t(k);
}
