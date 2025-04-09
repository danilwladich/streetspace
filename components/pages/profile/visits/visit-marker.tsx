import { Link } from "@/lib/navigation";
import Image from "next/image";
import type { Marker } from "@prisma/client";
import { addressToString } from "@/lib/address-helper";
import Rates from "@/components/common/rates";

export default function VisitMarker({
  id,
  address,
  images,
  avgRate,
  countRate,
  priorityImg = false,
}: Marker & { priorityImg?: boolean; avgRate: number; countRate: number }) {
  const imageSrc = (images as string[])[0];

  if (!address) {
    return null;
  }

  const addressString = addressToString(address);

  return (
    <Link href={`/location/${id}`} className="block space-y-1">
      <div className="relative aspect-video w-full overflow-hidden rounded-md">
        <Image
          src={imageSrc}
          alt={addressString}
          width={280}
          height={280}
          priority={priorityImg}
          className="absolute left-0 top-0 h-full w-full rounded object-cover"
        />
      </div>

      <Rates avg={avgRate} count={countRate} />

      <h4 className="text-xs font-semibold">{addressString}</h4>
    </Link>
  );
}
