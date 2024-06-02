import { MAX_FILES_COUNT, ACCEPTED_IMAGE_TYPES } from "@/lib/form-schema";
import { useCallback, useMemo } from "react";
import { useTranslations } from "next-intl";
import type { ControllerRenderProps } from "react-hook-form";

import {
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import SelectedImage from "./selected-image";
import Placeholder from "./placeholder";

export default function ImagesField({
  field,
  isSubmitting,
  setError,
  clearError,
}: {
  field: ControllerRenderProps<any, "images">;
  isSubmitting: boolean;
  setError: (msg: string) => void;
  clearError: () => void;
}) {
  const t = useTranslations("forms.addMarker.images");

  const value = field.value as File[];

  function handleImageUpload(files: FileList | null) {
    clearError();

    const images = Array.from(files || []);

    let newImages = [...value, ...images];

    if (newImages.length > MAX_FILES_COUNT) {
      newImages = newImages.slice(0, MAX_FILES_COUNT);
      setError(`You cannot upload more than ${MAX_FILES_COUNT} images`);
    }

    field.onChange(newImages);
  }

  const handleImageRemove = useCallback(
    (index: number) => {
      clearError();

      const newImages = [...value].filter((_, i) => i !== index);

      field.onChange(newImages);
    },
    [field, value, clearError],
  );

  return (
    <FormItem>
      <FormLabel>{t("title")}</FormLabel>

      <div className="[&_label]:has-[input:focus-visible]:ring-2 [&_label]:has-[input:focus-visible]:ring-ring">
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
          {useMemo(
            () =>
              value.map((image, i) => (
                <SelectedImage
                  key={`selected_${i}`}
                  image={image}
                  removeImage={() => handleImageRemove(i)}
                />
              )),
            [value, handleImageRemove],
          )}

          {Array.from({
            length: MAX_FILES_COUNT - value.length,
          }).map((_, i) => (
            <Placeholder key={`placeholder_${i}`} />
          ))}
        </div>

        <FormControl>
          <Input
            {...field}
            onChange={(e) => {
              handleImageUpload(e.target.files);
            }}
            value=""
            type="file"
            multiple
            accept={ACCEPTED_IMAGE_TYPES.join(", ")}
            disabled={isSubmitting}
            className="!sr-only"
          />
        </FormControl>
      </div>

      <FormMessage />
    </FormItem>
  );
}
