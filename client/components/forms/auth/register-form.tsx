"use client";

import axios, { AxiosError } from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { registerSchema as formSchema } from "@/lib/form-schema";
import { useState, useRef } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { useSearchParams, useRouter } from "next/navigation";
import { useAuthStore } from "@/hooks/use-auth-store";
import { toast } from "sonner";
import type { ErrorResponse } from "@/types/ErrorResponse";

import FormPasswordInput from "@/components/common/form-password-input";
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

export default function Register() {
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

  const recaptchaRef = useRef<ReCAPTCHA>(null);

  // State for handling submit errors
  const [submitError, setSubmitError] = useState("");

  // Checking if the form is currently submitting
  const isSubmitting = form.formState.isSubmitting;

  // Accessing query parameters from the URL
  const searchParams = useSearchParams();
  const router = useRouter();

  const { setUser } = useAuthStore();

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
        setSubmitError("Recaptcha error");
        return;
      }

      // Making a POST request to the register API endpoint
      const res = await axios.post("/api/auth/register", {
        ...values,
        recaptchaToken,
      });

      // Setting the authenticated user and redirecting
      setUser(res.data);

      const redirectUrl =
        searchParams.get("from") || `/profile/${res.data.username}`;
      router.replace(redirectUrl);
    } catch (e: unknown) {
      // Handling AxiosError
      const error = e as AxiosError;

      // Resetting recaptcha
      recaptchaRef.current?.reset();

      // Extracting response from AxiosError
      const res = error?.response as ErrorResponse<typeof formSchema>;

      // Handling non-response errors
      if (!res) {
        toast.error("Register error", { description: error.message });
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
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="Username"
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
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="example@mail.com"
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
              <FormLabel>Password</FormLabel>
              <FormPasswordInput
                field={field}
                placeholder="Password"
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
              <FormLabel>Confirm password</FormLabel>
              <FormPasswordInput
                field={field}
                placeholder="Confirm password"
                disabled={isSubmitting}
              />
              <FormMessage />
            </FormItem>
          )}
        />

        <ReCAPTCHA
          className="absolute"
          ref={recaptchaRef}
          size="invisible"
          sitekey="6LcwYyQkAAAAAMsq2VnRYkkqNqLt-ljuy-gfmPYn"
        />

        {!!submitError && (
          <p className="text-center text-sm font-medium text-destructive">
            {submitError}
          </p>
        )}

        <Button type="submit" disabled={isSubmitting}>
          Sign up
        </Button>
      </form>
    </Form>
  );
}
