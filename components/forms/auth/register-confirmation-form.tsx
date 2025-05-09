"use client";

import axios, { AxiosError } from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { registerConfirmationSchema as formSchema } from "@/lib/form-schema";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import { useSearchParams } from "next/navigation";
import { useRouter } from "@/lib/navigation";
import { useAuthStore } from "@/hooks/store/use-auth-store";
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
  FormRootError,
} from "@/components/ui/form";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
  InputOTPSeparator,
} from "@/components/ui/input-otp";

export default function RegisterConfirmation() {
  const t = useTranslations("forms.signUpConfirmation");

  // Accessing query parameters from the URL
  const searchParams = useSearchParams();
  const router = useRouter();

  // Setting up the form using react-hook-form with Zod resolver
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      token: "",
      email: searchParams.get("email") || "",
      recaptchaToken: "",
    },
  });

  const { executeRecaptcha } = useGoogleReCaptcha();

  // Checking if the form is currently submitting
  const isSubmitting = form.formState.isSubmitting;

  const { setUser } = useAuthStore();

  // Handler for form submission
  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      if (!executeRecaptcha) {
        form.setError("root", { message: "Antibot system error" });
        return;
      }

      // Executing recaptcha to get the token
      const recaptchaToken = await executeRecaptcha();

      // Making a POST request to the /api/auth/register/confirm API endpoint
      const { data } = await axios.post("/api/auth/register/confirm", {
        ...values,
        recaptchaToken,
      });

      // Setting the authenticated user
      setUser(data);

      // Redirecting
      const redirectUrl =
        searchParams.get("redirect") || `/profile/${data.username}`;
      router.replace(redirectUrl);
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
          name="token"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("token")}</FormLabel>
              <FormControl>
                <InputOTP
                  {...field}
                  maxLength={6}
                  disabled={isSubmitting}
                  onComplete={form.handleSubmit(onSubmit)}
                >
                  <InputOTPGroup>
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                    <InputOTPSlot index={2} />
                  </InputOTPGroup>
                  <InputOTPSeparator />
                  <InputOTPGroup>
                    <InputOTPSlot index={3} />
                    <InputOTPSlot index={4} />
                    <InputOTPSlot index={5} />
                  </InputOTPGroup>
                </InputOTP>
              </FormControl>
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
