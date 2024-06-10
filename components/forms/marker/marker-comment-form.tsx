"use client";

import axios, { AxiosError } from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { markerCommentSchema as formSchema } from "@/lib/form-schema";
import { useState } from "react";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import { useRouter } from "@/lib/navigation";
import { useModalStore } from "@/hooks/store/use-modal-store";
import { toast } from "sonner";
import { useTranslations } from "next-intl";
import type { ErrorResponse } from "@/types/ErrorResponse";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";

export default function MarkerCommentForm({ id }: { id: string }) {
  const t = useTranslations("forms.markerCommentInput");

  const router = useRouter();
  const { onClose } = useModalStore();

  const [submitError, setSubmitError] = useState("");

  // Setting up the form using react-hook-form with Zod resolver
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      markerId: id,
      message: "",
      recaptchaToken: "",
    },
  });

  const { executeRecaptcha } = useGoogleReCaptcha();

  // Checking if the form is currently submitting
  const isSubmitting = form.formState.isSubmitting;

  // Handler for form submission
  async function onSubmit(values: z.infer<typeof formSchema>) {
    // Clearing any previous submit errors
    setSubmitError("");

    try {
      if (!executeRecaptcha) {
        setSubmitError(t("recaptchaError"));
        return;
      }

      // Executing recaptcha to get the token
      const recaptchaToken = await executeRecaptcha();

      // Making a POST request to the marker comment API endpoint
      await axios.post("/api/marker/comment", { ...values, recaptchaToken });

      // Close the modal
      onClose();

      // Refreshing the current page
      router.refresh();
    } catch (e: unknown) {
      // Handling AxiosError
      const error = e as AxiosError;

      // Extracting response from AxiosError
      const res = error?.response as ErrorResponse<typeof formSchema>;

      // Handling non-response errors
      if (!res) {
        toast.error(t("submitError"), { description: error.message });
        return;
      }

      // Unauthorized handler
      if (res.status === 401) {
        router.push(`/auth?redirect=/location/${id}`);
      }

      // Validation, or internal server error handler
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
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="relative space-y-8"
      >
        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("comment")}</FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  placeholder={t("comment")}
                  disabled={isSubmitting}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

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
