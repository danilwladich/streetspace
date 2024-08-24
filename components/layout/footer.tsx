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
    <footer className="fixed bottom-0 left-0 z-40 w-full overflow-hidden bg-background/75 backdrop-blur-sm">
      <Separator />

      <Navigation />
    </footer>
  );
}
