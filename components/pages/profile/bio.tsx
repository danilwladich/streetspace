import { useTranslations } from "next-intl";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Bio({ bio }: { bio: string | null }) {
  const t = useTranslations("pages.profile");

  if (!bio) {
    return null;
  }

  return (
    <Card className="max-w-4xl">
      <CardHeader>
        <CardTitle>
          <h3>{t("aboutMe")}</h3>
        </CardTitle>
      </CardHeader>

      <CardContent>
        <p lang="" className="break-all text-sm">
          {bio}
        </p>
      </CardContent>
    </Card>
  );
}
