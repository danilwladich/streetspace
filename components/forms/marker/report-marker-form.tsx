"use client";

import axios, { AxiosError } from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  markerReportSchema as formSchema,
  reportMarkerTypes,
} from "@/lib/form-schema";
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
  FormRootError,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

export default function ReportMarkerForm({ id }: { id: string }) {
  const t = useTranslations("forms.reportMarker");

  const router = useRouter();
  const { onClose } = useModalStore();

  // Setting up the form using react-hook-form with Zod resolver
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      markerId: id,
      type: undefined,
      message: "",
    },
  });

  // Checking if the form is currently submitting
  const isSubmitting = form.formState.isSubmitting;

  // Handler for form submission
  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      // Making a POST request to the marker report API endpoint
      await axios.post("/api/marker/report", values);

      // Close the modal
      onClose();

      // Show a success toast
      toast.success(t("submitSuccess"));
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
          name="type"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex flex-col space-y-1"
                >
                  {reportMarkerTypes.map((type) => (
                    <FormItem
                      key={type}
                      className="flex items-center space-x-3 space-y-0"
                    >
                      <FormControl>
                        <RadioGroupItem value={type} />
                      </FormControl>
                      <FormLabel className="font-normal">{t(type)}</FormLabel>
                    </FormItem>
                  ))}
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {form.watch("type") === "other" && (
          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Textarea
                    {...field}
                    placeholder={t("reason")}
                    disabled={isSubmitting}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        <FormRootError />

        <Button type="submit" disabled={isSubmitting}>
          {t("submit")}
        </Button>
      </form>
    </Form>
  );
}
