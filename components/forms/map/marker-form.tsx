"use client";

import axios, { AxiosError } from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { markerSchema as formSchema } from "@/lib/form-schema";
import { parseFormDataFromJson } from "@/lib/formdata-parser";
import { useState, useRef } from "react";
import { toast } from "sonner";
import { ErrorResponse } from "@/types/ErrorResponse";
import ImagesField from "./images-field";
import { useSearchParams } from "next/navigation";
import { useRouter } from "@/lib/navigation";
import { useTranslations } from "next-intl";
import type ReCAPTCHA from "react-google-recaptcha";

import Recaptcha from "@/components/common/forms/recaptcha";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

export default function MarkerForm() {
  const t = useTranslations("forms.addMarker");

  const searchParams = useSearchParams();

  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");

  // Setting up the form using react-hook-form with Zod resolver
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      coords: lat && lng ? `${lat}, ${lng}` : "",
      address: "",
      images: [],
      recaptchaToken: "",
    },
  });

  const recaptchaRef = useRef<ReCAPTCHA>(null);

  // State for handling submit errors
  const [submitError, setSubmitError] = useState("");

  // Checking if the form is currently submitting
  const isSubmitting = form.formState.isSubmitting;

  const router = useRouter();

  // Handler for form submission
  async function onSubmit(values: z.infer<typeof formSchema>) {
    // Clearing any previous submit errors
    setSubmitError("");

    try {
      // Executing recaptcha to get the token
      const recaptchaToken = await recaptchaRef.current?.executeAsync();

      // Handling recaptcha errors
      if (!recaptchaToken) {
        recaptchaRef.current?.reset();
        setSubmitError(t("recaptchaError"));
        return;
      }

      const formData = parseFormDataFromJson({
        ...values,
        recaptchaToken,
      });

      // Making a POST request to the add API endpoint
      await axios.post("/api/marker/add", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      router.replace("/map");

      toast.success(t("success"));
    } catch (e: unknown) {
      // Handling AxiosError
      const error = e as AxiosError;

      // Resetting recaptcha
      recaptchaRef.current?.reset();

      // Extracting response from AxiosError
      const res = error?.response as ErrorResponse<typeof formSchema>;

      // Handling non-response errors
      if (!res) {
        toast.error(t("submitError"), { description: error.message });
        return;
      }

      // Validation, recaptcha, or internal server error handler
      if (typeof res.data === "string") {
        setSubmitError(res.data);
        return;
      }

      // Setting form error for a specific field
      const { field, message } = res.data;
      form.setError(field, { message });
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="coords"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("coords")}</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder={t("coordsPlaceholder")}
                  disabled={isSubmitting}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("address")}</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder={t("address")}
                  disabled={isSubmitting}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="images"
          render={({ field }) => (
            <ImagesField
              field={field}
              isSubmitting={isSubmitting}
              setError={(msg) =>
                form.setError("images", {
                  message: msg,
                })
              }
              clearError={() => form.clearErrors("images")}
            />
          )}
        />

        <Recaptcha ref={recaptchaRef} />

        {!!submitError && (
          <p className="text-center text-sm font-medium text-destructive">
            {submitError}
          </p>
        )}

        <Button type="submit" disabled={isSubmitting}>
          {t("submit")}
        </Button>
      </form>
    </Form>
  );
}
