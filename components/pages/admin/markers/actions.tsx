"use client";

import { useState } from "react";
import { useRouter } from "@/lib/navigation";
import { useTranslations } from "next-intl";
import axios, { type AxiosError } from "axios";

import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function Actions({ id }: { id: string }) {
  const t = useTranslations("pages.admin.markers");

  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  async function onApprove() {
    setIsLoading(true);

    try {
      // Send PATCH request to approve marker
      await axios.patch("/api/admin/marker/add", { id });

      // Refresh page to get new markers data
      router.refresh();
    } catch (e: unknown) {
      // Handling AxiosError
      const error = e as AxiosError;

      toast.error(t("approveError"), { description: error.message });
    }

    setIsLoading(false);
  }

  async function onDecline() {
    setIsLoading(true);

    try {
      // Send DELETE request to delete marker
      await axios.delete("/api/admin/marker", { data: { id } });

      // Refresh page to get new markers data
      router.refresh();
    } catch (e: unknown) {
      // Handling AxiosError
      const error = e as AxiosError;

      toast.error(t("rejectError"), { description: error.message });
    }

    setIsLoading(false);
  }
  return (
    <>
      <Button variant="outline" onClick={onDecline} disabled={isLoading}>
        {t("reject")}
      </Button>
      <Button onClick={onApprove} disabled={isLoading}>
        {t("approve")}
      </Button>
    </>
  );
}
