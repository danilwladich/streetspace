"use client";

import { useClientFetching } from "@/hooks/use-client-fetching";
import { useRouter } from "@/lib/navigation";
import { useTranslations } from "next-intl";

import { Star } from "lucide-react";
import { CommandItem } from "@/components/ui/command";

export default function StarsButton() {
  const t = useTranslations("pages.settings");

  const router = useRouter();

  const { data, isLoading } = useClientFetching<any>(
    "https://api.github.com/repos/danilwladich/streetspace",
  );
  const starsCount = data?.stargazers_count;

  function onClick() {
    router.push("https://github.com/danilwladich/streetspace");
  }

  return (
    <CommandItem className="flex w-full items-center gap-2" onSelect={onClick}>
      <Star className="h-4 w-4" />
      <span>{t("stars")}</span>
      {!isLoading && <span className="text-nowrap">{`( ${starsCount} )`}</span>}
    </CommandItem>
  );
}
