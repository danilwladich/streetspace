import Link from "next/link";
import { getUserMarkersCount } from "@/services/marker";
import moment from "moment";
import { getTranslations } from "next-intl/server";
import type { User } from "@prisma/client";

import { Button } from "@/components/ui/button";
import { DateToShow } from "@/components/common/date-to-show";

export default async function UserInfo({
  id,
  socialMedia,
  country,
  city,
  dateOfBirth,
  createdAt,
}: User) {
  const t = await getTranslations("pages.profile.info");

  const markersAdded = await getUserMarkersCount(id);

  const socialMediaJson: Record<string, string> = JSON.parse(
    socialMedia || "{}",
  );
  const socialMediaEntries = socialMedia ? Object.entries(socialMediaJson) : [];

  return (
    <>
      <div className="text-center">
        <h3 className="text-base font-semibold md:text-lg">
          {t("profile.title")}
        </h3>

        <p className="py-0.5 text-xs opacity-70 md:text-sm">
          {t("profile.memberSince")} <DateToShow date={createdAt} size="full" />
        </p>
        <p className="py-0.5 text-xs opacity-70 md:text-sm">
          {t("profile.locationsAdded")} {markersAdded}
        </p>
      </div>

      {(!!country || !!dateOfBirth) && (
        <div className="text-center">
          <h3 className="text-base font-semibold md:text-lg">
            {t("personal.title")}
          </h3>

          {!!dateOfBirth && (
            <p className="py-0.5 text-xs opacity-70 md:text-sm">
              {t("personal.yearsOld", {
                age: moment().diff(dateOfBirth, "years"),
              })}
            </p>
          )}
          {!!country && (
            <p className="py-0.5 text-xs opacity-70 md:text-sm">
              {`${city ? city + ", " : ""}${country}`}
            </p>
          )}
        </div>
      )}

      {!!socialMediaEntries.length && (
        <div className="text-center">
          <h3 className="text-base font-semibold md:text-lg">
            {t("social.title")}
          </h3>

          <div className="flex flex-wrap justify-center">
            {socialMediaEntries.map((s) => (
              <Link key={`${s[0]}_${s[1]}`} href={s[1]} target="_blank">
                <Button tabIndex={-1} variant="ghost" size="xs">
                  <p className="text-sm opacity-70">{s[0]}</p>
                </Button>
              </Link>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
