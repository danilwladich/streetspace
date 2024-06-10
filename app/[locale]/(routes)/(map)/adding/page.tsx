import { useTranslations } from "next-intl";

import MarkerForm from "@/components/forms/marker/adding/marker-form";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import RecaptchaProvider from "@/components/providers/recaptcha-provider";

export default function Adding() {
  const t = useTranslations("pages.map.adding");

  return (
    <Card className="max-w-4xl">
      <CardHeader>
        <CardTitle>{t("title")}</CardTitle>
        <CardDescription>{t("description")}</CardDescription>
      </CardHeader>

      <CardContent>
        <RecaptchaProvider>
          <MarkerForm />
        </RecaptchaProvider>
      </CardContent>
    </Card>
  );
}
