"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import type { ControllerRenderProps } from "react-hook-form";

import {
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function CoordsField({
  field,
  isSubmitting,
  setError,
  clearError,
}: {
  field: ControllerRenderProps<any, any>;
  isSubmitting: boolean;
  setError: (message: string) => void;
  clearError: () => void;
}) {
  const t = useTranslations("forms.editProfile");

  const [isLoading, setIsLoading] = useState(false);

  function getCoords() {
    clearError();

    if (!navigator.geolocation) {
      setError("Geolocation is not available in your browser");
      return;
    }

    setIsLoading(true);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const coords = `${position.coords.latitude}, ${position.coords.longitude}`;
        field.onChange(coords);
        setIsLoading(false);
      },
      () => {
        setError("Unable to get your location");
        setIsLoading(false);
      },
    );
  }

  return (
    <FormItem>
      <FormLabel>{t("coords")}</FormLabel>
      <FormControl>
        <Input
          {...field}
          placeholder={t("coordsPlaceholder")}
          disabled={isSubmitting || isLoading}
        />
      </FormControl>

      <Button
        type="button"
        variant="outline"
        size="sm"
        className="w-full"
        onClick={getCoords}
        disabled={isSubmitting || isLoading}
      >
        {t("getLocation")}
      </Button>

      <FormDescription>{t("coordsDescription")}</FormDescription>
      <FormMessage />
    </FormItem>
  );
}
