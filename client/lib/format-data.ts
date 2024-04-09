import type { NonFormattedStrapiImage, StrapiImage } from "@/types/StrapiImage";
import type { UserType, NonFormattedUserType } from "@/types/UserType";
import type { NonFormattedFollowsType, FollowsType } from "@/types/FollowsType";
import type { NonFormattedMarkerType, MarkerType } from "@/types/MarkerType";
import type { NonFormattedStrapiArray, StrapiArray } from "@/types/StrapiArray";

export function formatStrapiImage(image: NonFormattedStrapiImage): StrapiImage {
  return {
    id: image.id,
    url: `${process.env.STRAPI_URL}${image.url}`,
    alternativeText: image.alternativeText,
    formats: {
      thumbnail: {
        url: image.formats.thumbnail
          ? `${process.env.STRAPI_URL}${image.formats.thumbnail.url}`
          : undefined,
      },
      small: {
        url: image.formats.small
          ? `${process.env.STRAPI_URL}${image.formats.small.url}`
          : undefined,
      },
      medium: {
        url: image.formats.medium
          ? `${process.env.STRAPI_URL}${image.formats.medium.url}`
          : undefined,
      },
      large: {
        url: image.formats.large
          ? `${process.env.STRAPI_URL}${image.formats.large.url}`
          : undefined,
      },
    },
  };
}

export function formatStrapiImages(
  images: NonFormattedStrapiArray<NonFormattedStrapiImage>,
): StrapiImage[] {
  return images.data.map((image) =>
    formatStrapiImage({ id: image.id, ...image.attributes }),
  );
}

export function formatUser(user: NonFormattedUserType): UserType {
  return {
    id: user.id,
    username: user.username,
    email: user.email,
    blocked: user.blocked,
    role: user.role?.type || "user",
    avatar: user.avatar ? formatStrapiImage(user.avatar) : null,
  };
}

export function formatFollows(data: NonFormattedFollowsType): FollowsType {
  return {
    data: data.data.map((follow) => ({
      id: follow.id,
      whomFollow: {
        id: follow.attributes.whomFollow.data.id,
        username: follow.attributes.whomFollow.data.attributes.username,
        email: follow.attributes.whomFollow.data.attributes.email,
      },
      whoFollow: {
        id: follow.attributes.whoFollow.data.id,
        username: follow.attributes.whoFollow.data.attributes.username,
        email: follow.attributes.whoFollow.data.attributes.email,
      },
    })),
    pagination: data.meta.pagination,
  };
}

export function formatMarker(data: NonFormattedMarkerType): MarkerType {
  return {
    id: data.id,
    lat: data.lat,
    lng: data.lng,
    confirmed: data.confirmed,
    name: data.name,
    address: data.address,
    createdAt: data.createdAt,
    images: formatStrapiImages(data.images),
    addedBy: formatUser({
      id: data.addedBy.data.id,
      ...data.addedBy.data.attributes,
    }),
  };
}

export function formatMarkers(
  data: NonFormattedStrapiArray<NonFormattedMarkerType>,
): StrapiArray<MarkerType> {
  return {
    data: data.data.map((marker) => ({
      id: marker.id,
      lat: marker.attributes.lat,
      lng: marker.attributes.lng,
      confirmed: marker.attributes.confirmed,
      name: marker.attributes.name,
      address: marker.attributes.address,
      createdAt: marker.attributes.createdAt,
      images: formatStrapiImages(marker.attributes.images),
      addedBy: formatUser({
        id: marker.attributes.addedBy.data.id,
        ...marker.attributes.addedBy.data.attributes,
      }),
    })),
    pagination: data.meta.pagination,
  };
}
