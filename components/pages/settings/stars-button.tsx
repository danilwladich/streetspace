"use client";

import { useClientFetching } from "@/hooks/use-client-fetching";
import { Link } from "@/lib/navigation";
import { useTranslations } from "next-intl";

import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";

export default function StarsButton() {
  const t = useTranslations("pages.settings");

  const { data, isLoading } = useClientFetching<any>(
    "https://api.github.com/repos/danilwladich/streetspace",
  );
  const starsCount = data?.stargazers_count;

  return (
    <Link
      href="https://github.com/danilwladich/streetspace"
      target="_blank"
      className="block"
    >
      <Button
        tabIndex={-1}
        className="w-full justify-start gap-2"
        variant="ghost"
        size="sm"
      >
        <Star className="h-4 w-4" />
        <span>{t("stars")}</span>
        <div className="flex-1" />
        {!isLoading && starsCount && (
          <span className="text-muted-foreground">{starsCount}</span>
        )}
      </Button>
    </Link>
  );
}
