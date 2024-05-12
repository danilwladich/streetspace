import { ACCEPTED_IMAGE_TYPES } from "@/lib/form-schema";
import { useState } from "react";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useUserImageSrc } from "@/hooks/use-user-image-src";
import { useAuthStore } from "@/hooks/store/use-auth-store";
import type { ControllerRenderProps } from "react-hook-form";

import {
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

export default function AvatarField({
  field,
  isSubmitting,
}: {
  field: ControllerRenderProps<any, "avatar">;
  isSubmitting: boolean;
}) {
  const { user: authUser } = useAuthStore();

  const [selectedImage, setSelectedImage] = useState<File>();

  const defaultImageSrc = useUserImageSrc(authUser?.avatar);

  const imageSrc = selectedImage
    ? URL.createObjectURL(selectedImage)
    : defaultImageSrc;
  const alt = authUser!.username;
  const fallback = authUser!.username[0];

  return (
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
  );
}
