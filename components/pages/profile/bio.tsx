import { useTranslations } from "next-intl";

import { Card, CardContent } from "@/components/ui/card";

export default function Bio({ bio }: { bio: string | null }) {
  const t = useTranslations("pages.profile");

  if (!bio) {
    return null;
  }

  return (
    <Card className="max-w-4xl">
      <CardContent>
        <h4 className="text-base font-semibold md:text-lg">{t("aboutMe")}</h4>
        <p lang="" className="break-all pt-0.5 text-sm">
          {bio}
        </p>
      </CardContent>
    </Card>
  );
}
