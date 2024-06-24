import { Link } from "@/lib/navigation";
import Image from "next/image";
import type { Marker } from "@prisma/client";

export default function VisitMarker({
  id,
  address,
  images,
  priorityImg = false,
}: Marker & { priorityImg?: boolean }) {
  const imageSrc = JSON.parse(images)[0];

  return (
    <Link href={`/location/${id}`} className="block space-y-1">
      <div className="relative aspect-video w-full overflow-hidden rounded-md">
        <Image
          src={imageSrc}
          alt={address}
          width={280}
          height={280}
          priority={priorityImg}
          className="absolute left-0 top-0 h-full w-full rounded object-cover"
        />
      </div>

      <h4 className="text-xs font-semibold">{address}</h4>
    </Link>
  );
}
