"use client";

import axios, { AxiosError } from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import {
  ACCEPTED_IMAGE_TYPES,
  editAvatarSchema as formSchema,
} from "@/lib/form-schema";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/hooks/store/use-auth-store";
import { useUserImageSrc } from "@/hooks/use-user-image-src";
import { toast } from "sonner";
import { useModalStore } from "@/hooks/store/use-modal-store";
import { parseFormDataFromJson } from "@/lib/formdata-parser";
import Image from "next/image";
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
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

export default function ChangeAvatarForm() {
  // Setting up the form using react-hook-form with Zod resolver
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      image: undefined,
    },
  });

  const [selectedImage, setSelectedImage] = useState<File>();

  // State for handling submit errors
  const [submitError, setSubmitError] = useState("");

  // Checking if the form is currently submitting
  const isSubmitting = form.formState.isSubmitting;

  const router = useRouter();
  const { user: authUser, setUser } = useAuthStore();
  const { onClose } = useModalStore();

  const defaultImageSrc = useUserImageSrc(authUser?.avatar);

  // Handler for form submission
  async function onSubmit(values: z.infer<typeof formSchema>) {
    // Clearing any previous submit errors
    setSubmitError("");

    try {
      const formData = parseFormDataFromJson(values);

      // Making a PATCH request to the user avatar API endpoint
      const { data } = await axios.patch("/api/user/avatar", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      // Updating the user state with the new avatar
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
        toast.error("Change avatar error", { description: error.message });
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

  const imageSrc = selectedImage
    ? URL.createObjectURL(selectedImage)
    : defaultImageSrc;
  const alt = authUser?.username || "not auth";
  const fallback = authUser?.username[0] || "not auth";

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="image"
          render={({ field }) => (
            <FormItem className="[&_label]:has-[input:focus-visible]:ring-2 [&_label]:has-[input:focus-visible]:ring-ring">
              <div className="mt-4 flex justify-center">
                <FormLabel className="rounded-full">
                  <Avatar className="relative h-24 w-24 cursor-pointer">
                    <AvatarImage src={imageSrc} asChild>
                      <Image
                        src={imageSrc}
                        alt={alt}
                        priority
                        width={100}
                        height={100}
                        className="absolute left-0 top-0 h-full w-full object-cover"
                      />
                    </AvatarImage>
                    <AvatarFallback>{fallback}</AvatarFallback>
                  </Avatar>
                </FormLabel>
              </div>
              <FormControl>
                <Input
                  {...field}
                  onChange={(e) => {
                    const image = e.target.files?.[0] || undefined;
                    setSelectedImage(image);
                    field.onChange(image);
                  }}
                  value=""
                  type="file"
                  accept={ACCEPTED_IMAGE_TYPES.join(", ")}
                  disabled={isSubmitting}
                  className="!sr-only"
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
          Save
        </Button>
      </form>
    </Form>
  );
}
