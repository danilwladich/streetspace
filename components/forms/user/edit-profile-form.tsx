"use client";

import axios, { AxiosError } from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { editProfileSchema as formSchema } from "@/lib/form-schema";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/hooks/store/use-auth-store";
import { useModalStore } from "@/hooks/store/use-modal-store";
import { toast } from "sonner";
import { parseFormDataFromJson } from "@/lib/formdata-parser";
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
import { Input } from "@/components/ui/input";
import AvatarField from "./avatar-field";

export default function EditProfileForm() {
  const { user: authUser, setUser } = useAuthStore();

  const router = useRouter();
  const { onClose } = useModalStore();

  const [submitError, setSubmitError] = useState("");

  // Initial values for the form
  const socialMedia = JSON.parse(authUser?.socialMedia || "{}");
  const dateOfBirth = authUser?.dateOfBirth
    ? new Date(authUser.dateOfBirth).toISOString().split("T")[0]
    : "";

  // Setting up the form using react-hook-form with Zod resolver
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      avatar: undefined,
      dateOfBirth,
      country: authUser?.country || "",
      city: authUser?.city || "",
      socialMedia,
    },
  });

  // Checking if the form is currently submitting
  const isSubmitting = form.formState.isSubmitting;

  // Checking if the form has any dirty fields
  const dirtyFields = form.formState.dirtyFields;
  const isDirty = Object.values(dirtyFields).some(Boolean);

  // Handler for form submission
  async function onSubmit(values: z.infer<typeof formSchema>) {
    // Clearing any previous submit errors
    setSubmitError("");

    try {
      const formData = parseFormDataFromJson({
        ...values,
        socialMedia: JSON.stringify(values.socialMedia),
      });

      // Making a PATCH request to the user avatar API endpoint
      const { data } = await axios.patch("/api/user", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      // Updating the user state with the new username
      setUser(data);

      // Close the modal
      onClose();

      router.refresh();
    } catch (e: unknown) {
      // Handling AxiosError
      const error = e as AxiosError;

      // Extracting response from AxiosError
      const res = error?.response as ErrorResponse<typeof formSchema>;

      // Handling non-response errors
      if (!res) {
        toast.error("Edit profile error", { description: error.message });
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
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="relative space-y-8"
      >
        <FormField
          control={form.control}
          name="avatar"
          render={({ field }) => (
            <AvatarField field={field} isSubmitting={isSubmitting} />
          )}
        />

        <FormField
          control={form.control}
          name="dateOfBirth"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Date of birth</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="date"
                  autoComplete="bday"
                  max={new Date().toISOString().split("T")[0]}
                  disabled={isSubmitting}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="space-y-2">
          <p className="text-base font-semibold">Location</p>

          <FormField
            control={form.control}
            name="country"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Country</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder={authUser?.country || "Country"}
                    autoComplete="country-name"
                    disabled={isSubmitting}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="city"
            render={({ field }) => (
              <FormItem>
                <FormLabel>City</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder={authUser?.city || "City"}
                    autoComplete="address-level2"
                    disabled={isSubmitting}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="space-y-2">
          <p className="text-base font-semibold">Social media</p>

          <FormField
            control={form.control}
            name="socialMedia.facebook"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Facebook</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder={"Facebook"}
                    disabled={isSubmitting}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="socialMedia.instagram"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Instagram</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder={"Instagram"}
                    disabled={isSubmitting}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="socialMedia.twitter"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Twitter</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder={"Twitter"}
                    disabled={isSubmitting}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="socialMedia.youtube"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Youtube</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder={"Youtube"}
                    disabled={isSubmitting}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {!!submitError && (
          <p className="text-center text-sm font-medium text-destructive">
            {submitError}
          </p>
        )}

        <Button type="submit" disabled={isSubmitting || !isDirty}>
          Save
        </Button>
      </form>
    </Form>
  );
}
