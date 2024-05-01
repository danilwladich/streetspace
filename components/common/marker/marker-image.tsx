import Image from "next/image";

export default function MarkerImage({
  src,
  alt,
  onModalOpen,
}: {
  src: string;
  alt: string;
  onModalOpen: () => void;
}) {
  return (
    <button
      onClick={onModalOpen}
      className="relative aspect-video w-full overflow-hidden rounded-sm"
    >
      <Image
        src={src}
        alt={alt}
        width={260}
        height={260}
        priority
        className="absolute left-0 top-0 h-full w-full object-cover"
      />
    </button>
  );
}
