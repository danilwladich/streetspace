"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import axios, { type AxiosError } from "axios";

import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function Actions({ id }: { id: number }) {
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  async function onApprove() {
    setIsLoading(true);

    try {
      // Send PATCH request to approve marker
      await axios.patch('/api/admin/map/add', { id });

      // Refresh page to get new markers data
      router.refresh();
    } catch (e: unknown) {
      // Handling AxiosError
      const error = e as AxiosError;

      toast.error("Approve marker error", { description: error.message });
    }

    setIsLoading(false);
  }

  async function onDecline() {
    setIsLoading(true);

    try {
      // Send DELETE request to delete marker
      await axios.delete('/api/admin/map/add', { data: { id } });

      // Refresh page to get new markers data
      router.refresh();
    } catch (e: unknown) {
      // Handling AxiosError
      const error = e as AxiosError;

      toast.error("Decline marker error", { description: error.message });
    }

    setIsLoading(false);
  }
  return (
    <>
      <Button variant="outline" onClick={onDecline} disabled={isLoading}>
        Decline
      </Button>
      <Button onClick={onApprove} disabled={isLoading}>
        Approve
      </Button>
    </>
  );
}
