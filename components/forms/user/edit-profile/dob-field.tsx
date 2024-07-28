"use client";

import { useParams } from "next/navigation";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";
import type { ControllerRenderProps } from "react-hook-form";

import {
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { CalendarIcon } from "lucide-react";

export default function DateOfBirthField({
  field,
}: {
  field: ControllerRenderProps<any, any>;
}) {
  const t = useTranslations("forms.editProfile");
  const { locale } = useParams();

  return (
    <FormItem>
      <FormLabel>{t("dateOfBirth")}</FormLabel>
      <Popover>
        <PopoverTrigger asChild>
          <FormControl>
            <Button
              variant="outline"
              className={cn(
                "flex w-full",
                !field.value && "text-muted-foreground",
              )}
            >
              {field.value ? (
                new Date(field.value).toLocaleDateString(locale)
              ) : (
                <span>{t("dateOfBirth")}</span>
              )}
              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
            </Button>
          </FormControl>
        </PopoverTrigger>

        <PopoverContent className="w-full p-0" align="center">
          <Calendar
            mode="single"
            captionLayout="dropdown"
            selected={field.value}
            onSelect={field.onChange}
            fromYear={new Date().getFullYear() - 120}
            toYear={new Date().getFullYear() - 16}
          />
        </PopoverContent>
      </Popover>
      <FormDescription>{t("dateOfBirthDescription")}</FormDescription>
      <FormMessage />
    </FormItem>
  );
}
