import { useTheme } from "next-themes";

export function useUserImageSrc(imageUrl?: string) {
  const { resolvedTheme } = useTheme();

  const defaultImageUrl =
    resolvedTheme === "dark"
      ? "/images/common/user-dark.jpg"
      : "/images/common/user-light.jpg";

  const imageSrc = imageUrl || defaultImageUrl;

  return imageSrc;
}
