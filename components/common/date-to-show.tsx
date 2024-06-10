"use client";

import { useParams } from "next/navigation";

function getDateToShow(date: Date, locale: string, withTime?: boolean) {
  const now = new Date();

  if (date.getFullYear() < now.getFullYear()) {
    return date.toLocaleDateString(
      locale,
      withTime
        ? {
            year: "numeric",
            month: "numeric",
            day: "numeric",
            hour: "numeric",
            minute: "numeric",
          }
        : { year: "numeric", month: "numeric", day: "numeric" },
    );
  }

  return date.toLocaleDateString(
    locale,
    withTime
      ? {
          day: "numeric",
          month: "numeric",
          hour: "numeric",
          minute: "numeric",
        }
      : {day: "numeric",month: "numeric",},
  );
}

export function DateToShow({
  date,
  withTime,
  className,
}: {
  date: Date;
  withTime?: boolean;
  className?: string;
}) {
  const { locale } = useParams();

  return (
    <time dateTime={date.toString()} className={className}>
      {getDateToShow(date, locale as string, withTime)}
    </time>
  );
}
