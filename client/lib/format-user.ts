import type { UserType, NonFormattedUserType } from "@/types/UserType";

export function formatUser(user: NonFormattedUserType): UserType {
  return {
    ...user,
    role: user.role?.type || "user",
    avatar: user.avatar
      ? {
          url: `${process.env.STRAPI_URL}${user.avatar.url}`,
          alternativeText: user.avatar.alternativeText,
          formats: {
            thumbnail: {
              url: `${process.env.STRAPI_URL}${user.avatar.formats.thumbnail.url}`,
            },
            small: {
              url: `${process.env.STRAPI_URL}${user.avatar.formats.small.url}`,
            },
            medium: {
              url: `${process.env.STRAPI_URL}${user.avatar.formats.medium.url}`,
            },
            large: {
              url: `${process.env.STRAPI_URL}${user.avatar.formats.large.url}`,
            },
          },
        }
      : null,
  };
}
