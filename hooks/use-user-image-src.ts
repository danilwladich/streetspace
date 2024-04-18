import { useTheme } from "next-themes";

export function useUserImageSrc(imageUrl?: string | null) {
  const { resolvedTheme } = useTheme();

  const imageSrc = imageUrl || `/assets/user-${resolvedTheme}.jpg`;

  return imageSrc;
}
