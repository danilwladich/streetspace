export function getOpenGraphImage(title: string, image: string) {
  const url = `/api/og?title=${title}&image=${image}`;

  return {
    url,
    width: 1200,
    height: 630,
    alt: title,
  };
}
