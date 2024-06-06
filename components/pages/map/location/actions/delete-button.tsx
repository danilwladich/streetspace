"use client";

import axios, { AxiosError, AxiosResponse } from "axios";
import { useState } from "react";
import { useRouter } from "@/lib/navigation";
import { toast } from "sonner";
import { useModalStore } from "@/hooks/store/use-modal-store";
import { useTranslations } from "next-intl";

import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { Trash2 } from "lucide-react";

export default function DeleteButton({ id }: { id: string }) {
  const t = useTranslations("pages.map.location.actions.delete");

  const [isLoading, setIsLoading] = useState(false);

  const { onOpen } = useModalStore();

  const router = useRouter();

  function onDelete(e: React.MouseEvent<HTMLDivElement>) {
    const submitActionData = {
      description: t("description"),
      onSubmit: async () => {
        e.preventDefault();
        setIsLoading(true);

        try {
          // Making a DELETE request to the admin marker API endpoint
          await axios.delete("/api/admin/marker", { data: { id } });

          // Navigating back to the previous page
          router.back();
        } catch (e: unknown) {
          // Handling AxiosError
          const error = e as AxiosError;

          // Extracting response from AxiosError
          const res = error?.response as AxiosResponse<string, any>;

          // Handling non-response errors
          if (!res) {
            toast.error(t("deleteError"), { description: error.message });
            return;
          }
        }

        setIsLoading(false);
      },
    };
    onOpen("submit action", {
      submitActionData,
    });
  }

  return (
    <DropdownMenuItem
      disabled={isLoading}
      onClick={onDelete}
      className="flex gap-2"
    >
      <Trash2 className="h-4 w-4" />

      <span>{t("button")}</span>
    </DropdownMenuItem>
  );
}
