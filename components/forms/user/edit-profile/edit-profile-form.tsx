"use client";

import axios, { AxiosError } from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { editProfileSchema as formSchema } from "@/lib/form-schema";
import { useRouter } from "@/lib/navigation";
import { useAuthStore } from "@/hooks/store/use-auth-store";
import { toast } from "sonner";
import { parseFormDataFromJson } from "@/lib/formdata-parser";
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
import { Textarea } from "@/components/ui/textarea";
import AvatarField from "../avatar-field";
import DateOfBirthField from "./dob-field";
import CoordsField from "./coords-field";

export default function EditProfileForm() {
  const t = useTranslations("forms.editProfile");

  const { user: authUser, setUser } = useAuthStore();
  const router = useRouter();

  // Setting up the form using react-hook-form with Zod resolver
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      avatar: undefined,
      dateOfBirth: authUser!.dateOfBirth || undefined,
      bio: authUser!.bio || "",
      coords: authUser!.coords || "",
      socialMedia: JSON.parse(authUser!.socialMedia || "{}"),
    },
  });

  // Checking if the form is currently submitting
  const isSubmitting = form.formState.isSubmitting;

  // Checking if the form has any dirty fields
  const dirtyFields = form.formState.dirtyFields;
  const isDirty = Object.values(dirtyFields).some(Boolean);

  // Handler for form submission
  async function onSubmit(values: z.infer<typeof formSchema>) {
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

      // Redirecting to the user profile page
      router.replace(`/profile/${authUser!.username}`);
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
          name="avatar"
          render={({ field }) => (
            <AvatarField field={field} isSubmitting={isSubmitting} />
          )}
        />

        <FormField
          control={form.control}
          name="dateOfBirth"
          render={({ field }) => <DateOfBirthField field={field} />}
        />

        <FormField
          control={form.control}
          name="bio"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("bio")}</FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  placeholder={t("bio")}
                  disabled={isSubmitting}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="space-y-2">
          <p className="text-base font-semibold">{t("location")}</p>

          <FormField
            control={form.control}
            name="coords"
            render={({ field }) => (
              <CoordsField
                field={field}
                isSubmitting={isSubmitting}
                setError={(message: string) =>
                  form.setError("coords", { message })
                }
                clearError={() => form.clearErrors("coords")}
              />
            )}
          />
        </div>

        <div className="space-y-2">
          <p className="text-base font-semibold">{t("social")}</p>

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

        <FormRootError />

        <Button type="submit" disabled={isSubmitting || !isDirty}>
          {t("submit")}
        </Button>
      </form>
    </Form>
  );
}
