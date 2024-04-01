export function getStrapiImageUrl(url: string) {
  if (url.startsWith("/uploads")) {
    if (process.env.NODE_ENV === "production") {
      return process.env.REACT_APP_STRAPI_URL + url;
    }

    return process.env.REACT_APP_STRAPI_DEV_URL + url;
  }

  return url;
}
