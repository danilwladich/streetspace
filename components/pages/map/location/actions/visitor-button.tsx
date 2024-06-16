"use client";

import axios, { AxiosError, AxiosResponse } from "axios";
import { useState } from "react";
import { useRouter } from "@/lib/navigation";
import { toast } from "sonner";
import { useTranslations } from "next-intl";

import { Star, StarOff } from "lucide-react";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";

export default function VisitorButton({
  id,
  isVisitor,
}: {
  id: string;
  isVisitor: boolean;
}) {
  const t = useTranslations("pages.map.location.actions.visitor");

  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  async function onVisit(e: React.MouseEvent<HTMLDivElement>) {
    e.preventDefault();

    setIsLoading(true);

    try {
      if (isVisitor) {
        // Making a DELETE request to the visitor API endpoint
        await axios.delete("/api/marker/visitor", { data: { id } });
      } else {
        // Making a POST request to the visitor API endpoint
        await axios.post("/api/marker/visitor", { id });
      }

      // Refresh page to get new marker data
      router.refresh();
    } catch (e: unknown) {
      // Handling AxiosError
      const error = e as AxiosError;

      // Extracting response from AxiosError
      const res = error?.response as AxiosResponse<string, any>;

      // Handling non-response errors
      if (!res) {
        toast.error(t("submitError"), { description: error.message });
        return;
      }

      if (res.status === 401) {
        router.push(`/auth?redirect=/location/${id}`);
      }
    }

    setIsLoading(false);
  }

  const text = t(isVisitor ? "unVisitor" : "visitor");
  const icon = isVisitor ? (
    <StarOff className="h-4 w-4" />
  ) : (
    <Star className="h-4 w-4" />
  );

  return (
    <DropdownMenuItem disabled={isLoading} onClick={onVisit} className="gap-2">
      {icon}

      <span className="flex-1">{text}</span>
    </DropdownMenuItem>
  );
}
