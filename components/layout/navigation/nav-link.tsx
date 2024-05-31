import { Link } from "@/lib/navigation";
import type { ILink } from "./navigation";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export function NavLink({
  path,
  name,
  icon,
  isLastElement,
}: ILink & { isLastElement: boolean }) {
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

          <div className="absolute bottom-0 left-0 h-[1px] w-full bg-current opacity-0 transition-opacity group-hover:opacity-100" />
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
