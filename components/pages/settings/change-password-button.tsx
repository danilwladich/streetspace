"use client";

import { useModalStore } from "@/hooks/store/use-modal-store";

import { CommandItem } from "@/components/ui/command";
import { KeyRound } from "lucide-react";

export default function ChangePasswordButton() {
  const { onOpen } = useModalStore();

  return (
    <CommandItem
      className="flex w-full items-center gap-2"
      onSelect={() => onOpen("change password")}
    >
      <KeyRound className="h-4 w-4" />

      <span>Change password</span>
    </CommandItem>
  );
}
