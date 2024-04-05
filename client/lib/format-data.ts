import type { NonFormattedStrapiImage, StrapiImage } from "@/types/StrapiImage";
import type { UserType, NonFormattedUserType } from "@/types/UserType";
import type { NonFormattedFollowType, FollowType } from "@/types/FollowType";

export function formatStrapiImage(image: NonFormattedStrapiImage): StrapiImage {
  return {
    id: image.id,
    url: `${process.env.STRAPI_URL}${image.url}`,
    alternativeText: image.alternativeText,
    formats: {
      thumbnail: {
        url: `${process.env.STRAPI_URL}${image.formats.thumbnail.url}`,
      },
      small: {
        url: `${process.env.STRAPI_URL}${image.formats.small.url}`,
      },
      medium: {
        url: `${process.env.STRAPI_URL}${image.formats.medium.url}`,
      },
      large: {
        url: `${process.env.STRAPI_URL}${image.formats.large.url}`,
      },
    },
  };
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

export function formatFollow(data: NonFormattedFollowType): FollowType {
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
