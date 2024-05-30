"use client";

import { useParams } from "next/navigation";

function getDateToShow(date: Date) {
  const { locale } = useParams();
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
  return (
    <time dateTime={date.toString()} className={className}>
      {getDateToShow(date)}
    </time>
  );
}
