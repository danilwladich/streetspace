import { useTranslations } from "next-intl";

import MarkerForm from "@/components/forms/map/marker-form";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";

export default function Adding() {
  const t = useTranslations("pages.map.adding");

  return (
    <Card className="max-w-4xl">
      <CardHeader>
        <CardTitle>{t("title")}</CardTitle>
        <CardDescription>{t("description")}</CardDescription>
      </CardHeader>

      <CardContent>
        <MarkerForm />
      </CardContent>
    </Card>
  );
}
