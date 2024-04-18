import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import Image from "next/image";

export default function UserAvatar({ src, alt, fallback }: { src: string; alt: string, fallback: string }) {
  return (
    <Avatar className="h-20 w-20 md:h-24 md:w-24">
      <AvatarImage asChild src={src}>
        <Image src={src} alt={alt} width={100} height={100} />
      </AvatarImage>
      <AvatarFallback>{fallback}</AvatarFallback>
    </Avatar>
  );
}
