"use client";

import { useRouter } from "next/navigation";

import { Card, CardContent } from "@/components/ui/card";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Map } from "lucide-react";

export default function Admin() {
  const router = useRouter();

  function onRedirect(path: string) {
    router.push(path);
  }

  return (
    <Card className="max-w-lg">
      <CardContent>
        <Command>
          <CommandInput tabIndex={1} placeholder="Search..." />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>

            <CommandGroup heading="Admin panel">
              <CommandItem
                onSelect={() => onRedirect("/admin/markers")}
                className="flex items-center gap-2"
              >
                <Map className="h-4 w-4" />
                <span>Markers</span>
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      </CardContent>
    </Card>
  );
}
