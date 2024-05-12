"use client";

import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";

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
  const t = useTranslations("pages.admin.command");

  const router = useRouter();

  function onRedirect(path: string) {
    router.push(path);
  }

  return (
    <Card className="max-w-lg">
      <CardContent>
        <Command>
          <CommandInput tabIndex={1} placeholder={t("placeholder")} />
          <CommandList>
            <CommandEmpty>{t("empty")}</CommandEmpty>

            <CommandGroup heading={t("group")}>
              <CommandItem
                onSelect={() => onRedirect("/admin/markers")}
                className="flex items-center gap-2"
              >
                <Map className="h-4 w-4" />
                <span>{t("markers")}</span>
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      </CardContent>
    </Card>
  );
}
