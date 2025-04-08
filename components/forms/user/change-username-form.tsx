"use client";

import axios, { AxiosError } from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { editUsernameSchema as formSchema } from "@/lib/form-schema";
import { useRouter } from "@/lib/navigation";
import { useAuthStore } from "@/hooks/store/use-auth-store";
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
  FormRootError,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

export default function ChangeUsernameForm() {
  const t = useTranslations("forms.changeUsername");

  // Setting up the form using react-hook-form with Zod resolver
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
    },
  });

  // Checking if the form is currently submitting
  const isSubmitting = form.formState.isSubmitting;

  const router = useRouter();
  const { user: authUser, setUser } = useAuthStore();
  const { onClose } = useModalStore();

  // Handler for form submission
  async function onSubmit(values: z.infer<typeof formSchema>) {
    // Checking if the new username is the same as the current username
    if (authUser?.username === values.username) {
      form.setError("username", { message: "It is already your username" });
      return;
    }

    try {
      // Making a PATCH request to the /api/user/username API endpoint
      const { data } = await axios.patch("/api/user/username", values);

      // Updating the user state with the new username
      setUser(data);

      // Close the modal
      onClose();

      // Redirecting to the new profile page
      router.push(`/profile/${values.username}`);
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
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="relative space-y-8"
      >
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("username")}</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder={authUser!.username}
                  disabled={isSubmitting}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormRootError />

        <Button type="submit" disabled={isSubmitting}>
          {t("submit")}
        </Button>
      </form>
    </Form>
  );
}
