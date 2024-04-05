"use client";

import { Share, Copy, CopyCheck } from "lucide-react";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { useState } from "react";

export default function ShareButton({
  url,
  text,
}: {
  url: string;
  text: string;
}) {
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

  const onClick = isAbleToShare ? onShare : onCopy;

  const copyText = isCopied ? "Link copied" : "Copy link";
  const copyIcon = isCopied ? (
    <CopyCheck className="h-4 w-4" />
  ) : (
    <Copy className="h-4 w-4" />
  );

  return (
    <DropdownMenuItem onClick={onClick} className="gap-2">
      {isAbleToShare ? (
        <>
          <Share className="h-4 w-4" />

          <span>Share</span>
        </>
      ) : (
        <>
          {copyIcon}

          <span>{copyText}</span>
        </>
      )}
    </DropdownMenuItem>
  );
}
