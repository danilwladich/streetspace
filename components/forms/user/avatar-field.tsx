"use client";

import { ACCEPTED_IMAGE_TYPES } from "@/lib/form-schema";
import { useMemo } from "react";
import { useAuthStore } from "@/hooks/store/use-auth-store";
import type { ControllerRenderProps } from "react-hook-form";

import {
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Avatar from "@/components/ui/avatar";

export default function AvatarField({
  field,
  isSubmitting,
}: {
  field: ControllerRenderProps<any, any>;
  isSubmitting: boolean;
}) {
  const { user: authUser } = useAuthStore();
  const { avatar, username } = authUser!;

  const value = field.value as File | undefined;

  const avatarSrc = useMemo(
    () => (value ? URL.createObjectURL(value) : avatar),
    [value, avatar],
  );

  return (
    <FormItem className="[&_label]:has-[input:focus-visible]:ring-2 [&_label]:has-[input:focus-visible]:ring-ring">
      <div className="mt-4 flex justify-center">
        <FormLabel className="relative aspect-square w-28 cursor-pointer overflow-hidden rounded-full">
          <Avatar
            avatar={avatarSrc}
            username={username}
            width={115}
            height={115}
            priority
          />
        </FormLabel>
      </div>
      <FormControl>
        <Input
          {...field}
          onChange={(e) => {
            field.onChange(e.target.files?.[0] || undefined);
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
  );
}
