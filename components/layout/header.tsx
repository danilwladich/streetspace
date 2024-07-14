"use client";

import { useMediaQuery } from "@/hooks/use-media-query";
import { getAppTitle } from "@/lib/get-app-title";

import { Navigation } from "@/components/layout/navigation/navigation";
import { Separator } from "@/components/ui/separator";

export function Header() {
  const { isMobile } = useMediaQuery();

  if (isMobile) {
    return null;
  }

  return (
    <header className="fixed left-0 top-0 z-40 w-full overflow-hidden bg-[rgba(255,255,255,0.75)] backdrop-blur-sm dark:bg-[rgba(0,0,0,0.75)]">
      <div className="pl-[calc(100vw-100%)]">
        <div className="container flex items-center justify-between">
          <span className="truncate text-lg">{getAppTitle()}</span>

          <Navigation />
        </div>
      </div>

      <Separator />
    </header>
  );
}
