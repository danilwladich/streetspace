import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";
import { getPageMetadata } from "@/lib/metadata";
import type { Metadata } from "next";

import LoginForm from "@/components/forms/auth/login-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Link } from "@/lib/navigation";
import { Button } from "@/components/ui/button";
import RecaptchaProvider from "@/components/providers/recaptcha-provider";

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const t = await getTranslations("pages.auth");

  return getPageMetadata({
    path: "/auth",
    pageName: t("title"),
    description: t("description"),
    locale,
  });
}

export default function Auth() {
  const t = useTranslations("forms");

  return (
    <>
      <Card className="max-w-md">
        <CardHeader>
          <CardTitle>
            <h1>{t("signIn.title")}</h1>
          </CardTitle>
          <CardDescription>{t("signIn.description")}</CardDescription>
        </CardHeader>

        <CardContent>
          <RecaptchaProvider>
            <LoginForm />
          </RecaptchaProvider>
        </CardContent>
      </Card>

      <Card className="max-w-md">
        <CardContent>
          <Link href="/auth/register" className="block">
            <Button tabIndex={-1} variant="outline" className="w-full">
              {t("signUp.title")}
            </Button>
          </Link>
        </CardContent>
      </Card>
    </>
  );
}
