"use client";

import { useParams } from "next/navigation";

function getDateToShow(date: Date, locale: string) {
  const now = new Date();

  if (date.getFullYear() < now.getFullYear()) {
    return date.toLocaleDateString(locale);
  }

  return date.toLocaleDateString(locale, {
    day: "numeric",
    month: "numeric",
  });
}

export function DateToShow({
  date,
  className,
}: {
  date: Date;
  className?: string;
}) {
  const { locale } = useParams();

  return (
    <time dateTime={date.toString()} className={className}>
      {getDateToShow(date, locale as string)}
    </time>
  );
}
