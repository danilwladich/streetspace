"use client";

import { useMediaQuery } from "@/hooks/use-media-query";

import { Navigation } from "@/components/layout/navigation/navigation";
import { Separator } from "@/components/ui/separator";

export function Footer() {
  const { isDesktop } = useMediaQuery();

  if (isDesktop) {
    return null;
  }

  return (
    <footer className="fixed bottom-0 left-0 z-50 w-full overflow-hidden bg-[rgba(255,255,255,0.75)] backdrop-blur-sm dark:bg-[rgba(0,0,0,0.75)]">
      <Separator />

      <Navigation />
    </footer>
  );
}
