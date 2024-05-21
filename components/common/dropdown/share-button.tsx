"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";

import { Share, Copy, CopyCheck } from "lucide-react";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";

export default function ShareButton({
  url,
  text,
}: {
  url: string;
  text: string;
}) {
  const t = useTranslations("components.dropdown.shareButton");

  const [isCopied, setIsCopied] = useState(false);

  // Checking if the browser supports the Web Share API
  const isAbleToShare = !!navigator.share;

  async function onShare(e: React.MouseEvent<HTMLDivElement>) {
    e.preventDefault();

    try {
      await navigator.share({
        text,
        url: window.location.origin + url,
      });
    } catch (err) {
      console.log("Sharing failed:", err);
    }
  }

  if (isAbleToShare) {
    return (
      <DropdownMenuItem onClick={onShare} className="gap-2">
        <Share className="h-4 w-4" />

        <span>{t("share")}</span>
      </DropdownMenuItem>
    );
  }

  async function onCopy(e: React.MouseEvent<HTMLDivElement>) {
    e.preventDefault();

    if (isCopied) {
      return;
    }

    try {
      await navigator.clipboard.writeText(window.location.origin + url);

      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 1000);
    } catch (err) {
      console.log("Coping failed:", err);
    }
  }

  const copyText = t(isCopied ? "isCopied" : "copy");
  const copyIcon = isCopied ? (
    <CopyCheck className="h-4 w-4" />
  ) : (
    <Copy className="h-4 w-4" />
  );

  return (
    <DropdownMenuItem onClick={onCopy} className="gap-2">
      <>
        {copyIcon}

        <span>{copyText}</span>
      </>
    </DropdownMenuItem>
  );
}
