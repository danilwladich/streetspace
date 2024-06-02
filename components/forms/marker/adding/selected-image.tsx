import { useTranslations } from "next-intl";
import Image from "next/image";

import { Trash2 } from "lucide-react";

export default function SelectedImage({
  image,
  removeImage,
}: {
  image: File;
  removeImage: () => void;
}) {
  const t = useTranslations("forms.addMarker.images");

  return (
    <div className="group relative aspect-video text-current">
      <span className="absolute right-0 top-0 z-10 hidden bg-cyan-500 px-1 text-sm font-normal leading-4 group-first:block">
        {t("main")}
      </span>

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
        <button className="z-10" type="button" onClick={removeImage}>
          <Trash2 className="h-12 w-12 p-2" />
        </button>
        <div className="absolute left-0 top-0 h-full w-full bg-current opacity-50" />
      </div>
    </div>
  );
}
