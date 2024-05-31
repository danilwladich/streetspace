import { useTranslations } from "next-intl";

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

export default function Auth() {
  const t = useTranslations("forms");

  return (
    <>
      <Card className="max-w-md">
        <CardHeader>
          <CardTitle>{t("signUp.title")}</CardTitle>
          <CardDescription>{t("signUp.description")}</CardDescription>
        </CardHeader>
        <CardContent>
          <RegisterForm />
        </CardContent>
      </Card>

      <Card className="max-w-md">
        <CardContent>
          <Link href="/auth" className="block">
            <Button tabIndex={-1} variant="outline" className="w-full">
              {t("signIn.title")}
            </Button>
          </Link>
        </CardContent>
      </Card>
    </>
  );
}
