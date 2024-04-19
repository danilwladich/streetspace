import { MAX_FILES_COUNT, ACCEPTED_IMAGE_TYPES } from "@/lib/form-schema";
import { useState } from "react";
import Image from "next/image";
import type { ControllerRenderProps } from "react-hook-form";

import {
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ImagePlus, Trash2 } from "lucide-react";

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
  const [selectedImages, setSelectedImages] = useState<File[]>([]);

  function handleImageUpload(files: FileList | null) {
    clearError();

    const images = Array.from(files || []);

    let newImages = [...selectedImages, ...images];

    if (newImages.length > MAX_FILES_COUNT) {
      newImages = newImages.slice(0, MAX_FILES_COUNT);
      setError(`You cannot upload more than ${MAX_FILES_COUNT} images.`);
    }

    setSelectedImages(newImages);
    field.onChange(newImages);
  }

  function handleImageRemove(index: number) {
    clearError();

    const newImages = [...selectedImages].filter((_, i) => i !== index);

    setSelectedImages(newImages);
    field.onChange(newImages);
  }

  return (
    <FormItem className="[&_label]:has-[input:focus-visible]:ring-2 [&_label]:has-[input:focus-visible]:ring-ring">
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
        {selectedImages.map((image, index) => (
          <div
            key={`${index}_${image.name}}`}
            className="relative aspect-video text-black dark:text-white"
            onClick={(e) => e.preventDefault()}
          >
            {index === 0 && (
              <span className="absolute right-0 top-0 z-10 bg-cyan-500 px-1 opacity-75">
                main
              </span>
            )}

            <Image
              src={URL.createObjectURL(image)}
              alt={image.name}
              width={260}
              height={260}
              className="absolute left-0 top-0 h-full w-full object-cover"
            />

            <div
              className="absolute left-0 top-0 z-20 flex h-full w-full items-center
								justify-center opacity-0 duration-150 hover:opacity-100 has-[:focus]:opacity-100"
            >
              <button
                className="z-10"
                type="button"
                onClick={() => {
                  handleImageRemove(index);
                }}
              >
                <Trash2 className="h-12 w-12 p-2" />
              </button>
              <div className="absolute left-0 top-0 h-full w-full bg-white opacity-50 dark:bg-black" />
            </div>
          </div>
        ))}

        {Array.from({
          length: MAX_FILES_COUNT - selectedImages.length,
        }).map((_, index) => (
          <FormLabel
            key={`no_image_${index}`}
            className="relative aspect-video cursor-pointer border border-dashed text-black duration-150 dark:text-white"
          >
            {!selectedImages.length && index === 0 && (
              <span className="absolute right-0 top-0 bg-cyan-500 px-1 opacity-75">
                main
              </span>
            )}

            <div className="absolute left-0 top-0 flex h-full w-full flex-col items-center justify-center gap-2">
              <ImagePlus className="h-6 w-6" />
              <span>Select image</span>
            </div>
          </FormLabel>
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
      <FormMessage />
    </FormItem>
  );
}
