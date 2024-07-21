const base = process.env.NEXT_PUBLIC_URL_BASE || "";

export function getOpenGraphImages(title: string, image?: string | null) {
  const url = new URL("/api/og", base);

  url.searchParams.set("title", title);
  if (image) {
    url.searchParams.set("image", image);
  }

  return [
    {
      url,
      width: 1200,
      height: 630,
      alt: title,
    },
  ];
}
