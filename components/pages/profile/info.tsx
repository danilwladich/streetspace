import { Link } from "@/lib/navigation";
import { getUserMarkersCount } from "@/services/marker";
import { getTranslations } from "next-intl/server";
import { getYearsDiff } from "@/lib/dates";
import type { UserProfile } from "@/types/user";

import { Button } from "@/components/ui/button";
import { DateToShow } from "@/components/common/date-to-show";
import { Card, CardContent } from "@/components/ui/card";

export default async function UserInfo({
  id,
  socialMedia,
  country,
  city,
  dateOfBirth,
  createdAt,
}: UserProfile) {
  const t = await getTranslations("pages.profile.info");

  const markersAdded = await getUserMarkersCount(id);

  const socialMediaJson: Record<string, string> = JSON.parse(
    socialMedia || "{}",
  );
  const socialMediaEntries = socialMedia ? Object.entries(socialMediaJson) : [];

  return (
    <Card className="max-w-4xl">
      <CardContent className="flex flex-wrap justify-center gap-4 [&>*]:w-full [&>*]:max-w-[calc(50%-1rem)] md:[&>*]:max-w-[calc(33.333%-1rem)]">
        <div className="text-center">
          <h4 className="text-base font-semibold md:text-lg">
            {t("profile.title")}
          </h4>

          <p className="py-0.5 text-xs text-muted-foreground md:text-sm">
            {t("profile.memberSince")} <DateToShow date={createdAt} />
          </p>
          <p className="py-0.5 text-xs text-muted-foreground md:text-sm">
            {t("profile.locationsAdded")} {markersAdded}
          </p>
        </div>

        {(!!country || !!dateOfBirth) && (
          <div className="text-center">
            <h4 className="text-base font-semibold md:text-lg">
              {t("personal.title")}
            </h4>

            {!!dateOfBirth && (
              <p className="py-0.5 text-xs text-muted-foreground md:text-sm">
                {t("personal.yearsOld", {
                  age: getYearsDiff(dateOfBirth),
                })}
              </p>
            )}
            {!!country && (
              <p
                lang=""
                className="py-0.5 text-xs text-muted-foreground md:text-sm"
              >
                {`${city ? city + ", " : ""}${country}`}
              </p>
            )}
          </div>
        )}

        {!!socialMediaEntries.length && (
          <div className="text-center">
            <h4 className="text-base font-semibold md:text-lg">
              {t("social.title")}
            </h4>

            <div className="flex flex-wrap justify-center">
              {socialMediaEntries.map(
                (s) =>
                  s[1] && (
                    <Link key={`${s[0]}_${s[1]}`} href={s[1]} target="_blank">
                      <Button tabIndex={-1} variant="ghost" size="xs">
                        <p className="text-sm text-muted-foreground">{s[0]}</p>
                      </Button>
                    </Link>
                  ),
              )}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
