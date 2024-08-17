import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";
import { getPageMetadata } from "@/lib/metadata";
import type { Metadata } from "next";

import RegisterForm from "@/components/forms/auth/register-form";
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
    path: "/auth/register",
    pageName: t("title"),
    description: t("description"),
    locale,
  });
}

export default function Auth({
  searchParams,
}: {
  searchParams: Record<string, string>;
}) {
  const t = useTranslations("forms");

  return (
    <>
      <Card className="max-w-md">
        <CardHeader>
          <CardTitle>
            <h1>{t("signUp.title")}</h1>
          </CardTitle>
          <CardDescription>{t("signUp.description")}</CardDescription>
        </CardHeader>
        <CardContent>
          <RecaptchaProvider>
            <RegisterForm />
          </RecaptchaProvider>
        </CardContent>
      </Card>

      <Card className="max-w-md">
        <CardContent>
          <Link
            href={{ pathname: "/auth", query: searchParams }}
            className="block"
          >
            <Button tabIndex={-1} variant="outline" className="w-full">
              {t("signIn.title")}
            </Button>
          </Link>
        </CardContent>
      </Card>
    </>
  );
}
