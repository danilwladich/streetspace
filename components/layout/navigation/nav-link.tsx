import { Link } from "@/lib/navigation";
import type { ILink } from "./navigation";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export function NavLink({ path, name, icon }: ILink) {
  return (
    <>
      <Link href={path} className="group flex flex-1 justify-center">
        <Button tabIndex={-1} variant="link" className="gap-2">
          {icon}

          <span className="sr-only md:not-sr-only md:relative md:whitespace-nowrap">
            {name}

            <div className="absolute bottom-0 left-0 h-[1px] w-full bg-current opacity-0 transition-opacity group-hover:opacity-100" />
          </span>
        </Button>
      </Link>

      <Separator orientation="vertical" className="block h-6 last:hidden" />
    </>
  );
}
