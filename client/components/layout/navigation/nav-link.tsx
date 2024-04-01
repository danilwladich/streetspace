"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

import type { ILink } from "./navigation";

export function NavLink({
  path,
  name,
  icon,
  isLastElement,
}: ILink & { isLastElement: boolean }) {
  const pathname = usePathname();

  const isActive = pathname === path;

  return (
    <Link
      href={path}
      className="group flex flex-1 items-center justify-between"
    >
      <div />

      <Button tabIndex={-1} variant="link" className="gap-2">
        {icon}

        <span className="sr-only md:not-sr-only md:relative md:whitespace-nowrap">
          {name}

          <div
            className={cn(
              "absolute bottom-0 left-0 h-[1px] w-full bg-current opacity-0 transition-opacity group-hover:opacity-100",
              isActive && "opacity-100",
            )}
          />
        </span>
      </Button>

      {!isLastElement ? (
        <Separator orientation="vertical" className="h-2/3" />
      ) : (
        <div />
      )}
    </Link>
  );
}
