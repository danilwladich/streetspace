import type { UserType, NonFormattedUserType } from "@/types/UserType";
import type { NonFormattedFollowType, FollowType } from "@/types/FollowType";

export function formatUser(user: NonFormattedUserType): UserType {
  return {
    id: user.id,
    username: user.username,
    email: user.email,
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
