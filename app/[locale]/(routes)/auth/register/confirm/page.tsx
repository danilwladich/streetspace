import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";
import { getPageMetadata } from "@/lib/metadata";
import type { Metadata } from "next";

import RegisterConfirmation from "@/components/forms/auth/register-confirmation-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import RecaptchaProvider from "@/components/providers/recaptcha-provider";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("pages.auth");

  return getPageMetadata({
    pageName: t("title"),
    robots: false,
  });
}

export default function Auth() {
  const t = useTranslations("forms.signUpConfirmation");

  return (
    <>
      <Card className="max-w-md">
        <CardHeader>
          <CardTitle>
            <h1>{t("title")}</h1>
          </CardTitle>
          <CardDescription>{t("description")}</CardDescription>
        </CardHeader>
        <CardContent>
          <RecaptchaProvider>
            <RegisterConfirmation />
          </RecaptchaProvider>
        </CardContent>
      </Card>
    </>
  );
}
