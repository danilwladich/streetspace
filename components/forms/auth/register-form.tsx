"use client";

import axios, { AxiosError } from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { registerSchema as formSchema } from "@/lib/form-schema";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import { useSearchParams } from "next/navigation";
import { useRouter } from "@/lib/navigation";
import { toast } from "sonner";
import { useTranslations } from "next-intl";
import type { ErrorResponse } from "@/types/ErrorResponse";

import FormPasswordInput from "@/components/common/forms/form-password-input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormRootError,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

export default function Register() {
  const t = useTranslations("forms.signUp");

  // Setting up the form using react-hook-form with Zod resolver
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
      recaptchaToken: "",
    },
  });

  const { executeRecaptcha } = useGoogleReCaptcha();

  // Checking if the form is currently submitting
  const isSubmitting = form.formState.isSubmitting;

  // Accessing query parameters from the URL
  const searchParams = useSearchParams();
  const router = useRouter();

  // Handler for form submission
  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      if (!executeRecaptcha) {
        form.setError("root", { message: "Antibot system error" });
        return;
      }

      // Executing recaptcha to get the token
      const recaptchaToken = await executeRecaptcha();

      // Making a POST request to the /api/auth/register API endpoint
      await axios.post("/api/auth/register", {
        ...values,
        recaptchaToken,
      });

      // Redirecting to the confirmation page
      router.replace(
        `/auth/register/confirm?email=${values.email}&${searchParams.toString()}`,
      );
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
        form.setError("root", { message: res.data });
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
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("username")}</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder={t("username")}
                  disabled={isSubmitting}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("email")}</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder={t("email")}
                  disabled={isSubmitting}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("password")}</FormLabel>
              <FormPasswordInput
                field={field}
                placeholder={t("password")}
                disabled={isSubmitting}
              />
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("passwordConfirmation")}</FormLabel>
              <FormPasswordInput
                field={field}
                placeholder={t("passwordConfirmation")}
                disabled={isSubmitting}
              />
              <FormMessage />
            </FormItem>
          )}
        />

        <FormRootError />

        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {t("submit")}
        </Button>
      </form>
    </Form>
  );
}
