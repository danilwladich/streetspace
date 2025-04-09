"use client";

import axios, { AxiosError, AxiosResponse } from "axios";
import { useState } from "react";
import { useRouter } from "@/lib/navigation";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { useTranslations } from "next-intl";

import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";

export default function RateButtons({
  id,
  avg,
  authRate,
}: {
  id: string;
  avg: number;
  authRate: number | null;
}) {
  const t = useTranslations("pages.map.location.actions.visitor");

  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  async function onRate(rate: number) {
    if (isLoading) {
      return;
    }

    setIsLoading(true);

    try {
      if (authRate) {
        // Making a PATCH request to the rate API endpoint
        await axios.patch("/api/marker/rate", { id, rate });
      } else {
        // Making a POST request to the rate API endpoint
        await axios.post("/api/marker/rate", { id, rate });
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

  const roundedAvgRate = Math.floor(avg);

  const lastStarWidth = `${(avg - roundedAvgRate) * 2}rem`;

  return (
    <>
      {Array.from({ length: 5 }, (_, i) => (
        <Button
          key={i}
          variant="link"
          size="icon"
          className={cn(
            "relative",
            authRate && authRate > i && "text-yellow-400",
          )}
          onClick={() => onRate(i + 1)}
        >
          <Star
            fill={
              (authRate && authRate > i) || (!authRate && roundedAvgRate > i)
                ? "currentColor"
                : "none"
            }
            className="h-8 w-8 transition-colors"
          />

          {!authRate && avg > i && avg !== i && (
            <div
              className="absolute left-1 top-1 overflow-hidden"
              style={{ width: lastStarWidth }}
            >
              <Star className="h-8 w-8" fill="currentColor" />
            </div>
          )}
        </Button>
      ))}
    </>
  );
}
