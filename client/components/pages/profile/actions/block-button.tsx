"use client";

import axios, { AxiosError, AxiosResponse } from "axios";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { ShieldBan, ShieldCheck } from "lucide-react";

export default function BlockButton({
  id,
  blocked,
}: {
  id: number;
  blocked: boolean;
}) {
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  async function onBlock(e: React.MouseEvent<HTMLDivElement>) {
    e.preventDefault();

    setIsLoading(true);

    try {
      // Making a PATCH request to the admin API endpoint
      await axios.patch("/api/admin/block", { userId: id, bool: !blocked });

      // Refresh page to get new user data
      router.refresh();
    } catch (e: unknown) {
      // Handling AxiosError
      const error = e as AxiosError;

      // Extracting response from AxiosError
      const res = error?.response as AxiosResponse<string, any>;

      // Handling non-response errors
      if (!res) {
        toast.error("Block user error", { description: error.message });
        return;
      }
    }

    setIsLoading(false);
  }

  const blockText = blocked ? "Unblock" : "Block";
  const blockIcon = blocked ? (
    <ShieldCheck className="h-4 w-4" />
  ) : (
    <ShieldBan className="h-4 w-4" />
  );

  return (
    <DropdownMenuItem
      disabled={isLoading}
      onClick={onBlock}
      className="flex gap-2"
    >
      {blockIcon}

      <span>{blockText}</span>
    </DropdownMenuItem>
  );
}
