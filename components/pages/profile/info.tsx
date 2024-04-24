import Link from "next/link";
import { getUserMarkersCount } from "@/services/marker";
import moment from "moment";
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
  const markersAdded = await getUserMarkersCount(id);

  const socialMediaJson: Record<string, string> = JSON.parse(
    socialMedia || "{}",
  );
  const socialMediaEntries = socialMedia ? Object.entries(socialMediaJson) : [];

  return (
    <>
      <div className="text-center">
        <h3 className="text-base font-semibold md:text-lg">Profile info</h3>

        <p className="py-0.5 text-xs opacity-70 md:text-sm">
          Member since <DateToShow date={createdAt} size="full" />
        </p>
        <p className="py-0.5 text-xs opacity-70 md:text-sm">
          Locations added {markersAdded}
        </p>
      </div>

      {(!!country || !!dateOfBirth) && (
        <div className="text-center">
          <h3 className="text-base font-semibold md:text-lg">Personal data</h3>

          {!!dateOfBirth && (
            <p className="py-0.5 text-xs opacity-70 md:text-sm">
              {moment().diff(dateOfBirth, "years")} years old
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
          <h3 className="text-base font-semibold md:text-lg">Social media</h3>

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
