import { Link } from "@/lib/navigation";
import Image from "next/image";
import type { Marker } from "@prisma/client";

export default function VisitMarker({ id, address, images }: Marker) {
  const imageSrc = JSON.parse(images)[0];

  return (
    <Link href={`/location/${id}`} className="block">
      <div className="relative aspect-video w-full overflow-hidden rounded-md">
        <Image
          src={imageSrc}
          alt={address}
          width={280}
          height={280}
          className="absolute left-0 top-0 h-full w-full rounded object-cover"
        />
      </div>

      <h4 className="mt-1 text-xs font-semibold">{address}</h4>
    </Link>
  );
}
