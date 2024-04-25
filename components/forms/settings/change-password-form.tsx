"use client";

import axios, { AxiosError } from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { changePasswordSchema as formSchema } from "@/lib/form-schema";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useModalStore } from "@/hooks/store/use-modal-store";
import { toast } from "sonner";
import { useAppTranslation } from "@/hooks/use-app-translation";
import type { ErrorResponse } from "@/types/ErrorResponse";

import FormPasswordInput from "@/components/common/forms/form-password-input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

export default function ChangePasswordForm() {
  const { t } = useAppTranslation("forms.changePassword");

  // Setting up the form using react-hook-form with Zod resolver
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      passwordConfirmation: "",
    },
  });

  // State for handling submit errors
  const [submitError, setSubmitError] = useState("");

  // Checking if the form is currently submitting
  const isSubmitting = form.formState.isSubmitting;

  const router = useRouter();

  const { onClose } = useModalStore();

  // Handler for form submission
  async function onSubmit(values: z.infer<typeof formSchema>) {
    // Clearing any previous submit errors
    setSubmitError("");

    try {
      // Making a PATCH request to the user password API endpoint
      await axios.patch("/api/user/password", values);

      // Close the modal
      onClose();

      router.push("/auth");
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

      // Validation, recaptcha, or internal server error handler
      if (typeof res.data === "string") {
        setSubmitError(res.data);
        return;
      }

      // Setting form error for a specific field
      const { field, message } = res.data;
      form.setError(field, { message: t(message) });
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
          name="currentPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("currentPassword")}</FormLabel>
              <FormPasswordInput
                field={field}
                autoComplete="off"
                placeholder={t("currentPassword")}
                disabled={isSubmitting}
              />
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="newPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("newPassword")}</FormLabel>
              <FormPasswordInput
                field={field}
                autoComplete="new-password"
                placeholder={t("newPassword")}
                disabled={isSubmitting}
              />
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="passwordConfirmation"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("passwordConfirmation")}</FormLabel>
              <FormPasswordInput
                field={field}
                autoComplete="new-password"
                placeholder={t("passwordConfirmation")}
                disabled={isSubmitting}
              />
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
