import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

export default function UserAvatar({
  src,
  alt,
  fallback,
}: {
  src: string;
  alt: string;
  fallback: string;
}) {
  return (
    <Avatar className="h-20 w-20 md:h-24 md:w-24">
      <AvatarImage src={src} alt={alt} />
      <AvatarFallback>{fallback}</AvatarFallback>
    </Avatar>
  );
}
