"use client";

import { useAuthStore } from "@/hooks/store/use-auth-store";

import ModeToggle from "@/components/pages/settings/theme-button";
import StarsButton from "@/components/pages/settings/stars-button";
import LogOutButton from "@/components/pages/settings/log-out-button";
import ChangePasswordButton from "@/components/pages/settings/change-password-button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";

export default function Settings() {
  const { user: authUser } = useAuthStore();

  return (
    <Card className="max-w-lg">
      <CardContent>
        <Command>
          <CommandInput tabIndex={1} placeholder="Search..." />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>

            <CommandGroup heading="General">
              <ModeToggle />

              <StarsButton />
            </CommandGroup>

            {!!authUser && (
              <>
                <CommandSeparator />

                <CommandGroup heading="Profile">
                  <ChangePasswordButton />

                  <LogOutButton />
                </CommandGroup>
              </>
            )}
          </CommandList>
        </Command>
      </CardContent>
    </Card>
  );
}
