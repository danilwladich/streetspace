"use client";

import axios, { AxiosError } from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { markerSchema as formSchema } from "@/lib/form-schema";
import { parseFormDataFromJson } from "@/lib/formdata-parser";
import { useState, useRef } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { ErrorResponse } from "@/types/ErrorResponse";
import ImagesField from "./images-field";
import { useSearchParams } from "next/navigation";
import { MarkerTypeEnum } from "@/types/MarkerType";

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
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

export default function MarkerForm() {
  const searchParams = useSearchParams();

  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");

  // Setting up the form using react-hook-form with Zod resolver
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      coords: lat && lng ? `${lat}, ${lng}` : "",
      address: "",
      type: undefined,
      images: [],
      recaptchaToken: "",
    },
  });

  const recaptchaRef = useRef<ReCAPTCHA>(null);

  // State for handling submit errors
  const [submitError, setSubmitError] = useState("");

  // Checking if the form is currently submitting
  const isSubmitting = form.formState.isSubmitting;

  const router = useRouter();

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

      const formData = parseFormDataFromJson({
        ...values,
        recaptchaToken,
      });

      // Making a POST request to the map API endpoint
      const { data } = await axios.post("/api/map/add", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      router.replace(`/map/location/${data}`);
    } catch (e: unknown) {
      // Handling AxiosError
      const error = e as AxiosError;

      // Resetting recaptcha
      recaptchaRef.current?.reset();

      // Extracting response from AxiosError
      const res = error?.response as ErrorResponse<typeof formSchema>;

      // Handling non-response errors
      if (!res) {
        toast.error("Article marker error", { description: error.message });
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
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Name" disabled={isSubmitting} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="coords"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Coords</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="latitude, longitude"
                  disabled={isSubmitting}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Address</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="Address"
                  disabled={isSubmitting}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Type</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {Object.keys(MarkerTypeEnum).map((currency) => (
                    <SelectItem key={currency} value={currency}>
                      {currency}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="images"
          render={({ field }) => (
            <ImagesField
              field={field}
              isSubmitting={isSubmitting}
              setError={(msg) =>
                form.setError("images", {
                  message: msg,
                })
              }
              clearError={() => form.clearErrors("images")}
            />
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
          Submit
        </Button>
      </form>
    </Form>
  );
}
