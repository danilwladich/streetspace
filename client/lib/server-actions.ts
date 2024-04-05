"use server";

import axios from "axios";
import { formatFollow, formatUser } from "@/lib/format-data";
import { getJwt } from "./get-jwt";
import type { NonFormattedUserType, UserType } from "@/types/UserType";
import type { NonFormattedFollowType } from "@/types/FollowType";
import type { StrapiError } from "@/types/StrapiError";
import type { NonFormattedStrapiImage } from "@/types/StrapiImage";

const STRAPI_URL = process.env.STRAPI_URL;
const API_TOKEN = process.env.API_TOKEN;

export async function verifyCaptcha(token: string): Promise<boolean> {
  const res = await axios.post(
    `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${token}`,
  );
  return res.data.success;
}

export async function getMe(): Promise<UserType | null> {
  const res = await fetch(`${STRAPI_URL}/api/users/me?populate=role,avatar`, {
    method: "GET",
    headers: { Authorization: `Bearer ${getJwt()}` },
  });
  const data = await res.json();

  if (data.error) {
    return null;
  }

  return formatUser(data);
}

export async function login(
  identifier: string,
  password: string,
): Promise<{ user: UserType; jwt: string } | null> {
  try {
    const { data } = await axios.post<{
      user: NonFormattedUserType;
      jwt: string;
    }>(
      `${STRAPI_URL}/api/auth/local?populate=role,avatar`,
      { identifier, password },
      {
        headers: {
          "Content-Type": "application/json",
        },
      },
    );

    return { user: formatUser(data.user), jwt: data.jwt };
  } catch (error) {
    return null;
  }
}

export async function register(
  username: string,
  email: string,
  password: string,
): Promise<{ user: UserType; jwt: string } | null> {
  try {
    const { data } = await axios.post<{
      user: NonFormattedUserType;
      jwt: string;
    }>(
      `${STRAPI_URL}/api/auth/local/register`,
      { username, email, password },
      {
        headers: {
          "Content-Type": "application/json",
        },
      },
    );

    return { user: formatUser(data.user), jwt: data.jwt };
  } catch (error) {
    return null;
  }
}

export async function checkEmail(email: string): Promise<boolean> {
  const { data } = await axios.get<NonFormattedUserType[]>(
    `${STRAPI_URL}/api/users`,
    { params: { "filters[email][$eq]": email } },
  );

  return data.length > 0;
}

export async function checkUsername(username: string): Promise<boolean> {
  const { data } = await axios.get<NonFormattedUserType[]>(
    `${STRAPI_URL}/api/users`,
    { params: { "filters[username][$eq]": username } },
  );

  return data.length > 0;
}

export async function blockUser(
  userId: number,
  bool: boolean,
): Promise<boolean> {
  try {
    await axios.put<NonFormattedUserType>(
      `${STRAPI_URL}/api/users/${userId}`,
      { blocked: bool },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${API_TOKEN}`,
        },
      },
    );

    return true;
  } catch (error) {
    return false;
  }
}

export async function changePassword(
  currentPassword: string,
  password: string,
  passwordConfirmation: string,
): Promise<{ error?: string; success: boolean }> {
  try {
    await axios.post(
      `${STRAPI_URL}/api/auth/change-password`,
      { currentPassword, password, passwordConfirmation },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getJwt()}`,
        },
      },
    );
    return { success: true };
  } catch (e: any) {
    const error = e.response?.data?.error as StrapiError | undefined;
    const message =
      error?.message || "An error occurred while changing the password";
    return { error: message, success: false };
  }
}

export async function changeUsername(
  userId: number,
  username: string,
): Promise<UserType | null> {
  try {
    const { data } = await axios.put<NonFormattedUserType>(
      `${STRAPI_URL}/api/users/${userId}`,
      { username },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${API_TOKEN}`,
        },
      },
    );

    return formatUser(data);
  } catch (error) {
    return null;
  }
}

export async function deleteAvatar(id: number): Promise<boolean> {
  try {
    await axios.delete(`${STRAPI_URL}/api/upload/files/${id}`, {
      headers: {
        Authorization: `Bearer ${API_TOKEN}`,
      },
    });

    return true;
  } catch (error) {
    return false;
  }
}

export async function changeAvatar(
  userId: number,
  image: File,
): Promise<UserType | null> {
  try {
    const formData = new FormData();

    const fileName = `avatar_${userId}_${Date.now()}`;
    formData.append(`files`, image, fileName);

    const { data: avatarData } = await axios.post<NonFormattedStrapiImage[]>(
      `${STRAPI_URL}/api/upload`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${API_TOKEN}`,
        },
      },
    );

    const avatarId = avatarData[0].id;

    const { data: userData } = await axios.put(
      `${STRAPI_URL}/api/users/${userId}`,
      { avatar: avatarId },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${API_TOKEN}`,
        },
      },
    );

    return formatUser(userData);
  } catch (error) {
    return null;
  }
}

export async function getUserByUsername(
  username: string,
): Promise<UserType | undefined> {
  const res = await axios.get<(NonFormattedUserType | undefined)[]>(
    `${STRAPI_URL}/api/users`,
    {
      params: {
        "filters[username][$eq]": username,
        populate: "avatar",
      },
    },
  );

  const data = res.data[0];

  return data ? formatUser(data) : undefined;
}

export async function getUserById(id: number): Promise<UserType | undefined> {
  const res = await axios.get<NonFormattedUserType | undefined>(
    `${STRAPI_URL}/api/users/${id}`,
    {
      params: {
        populate: "avatar",
      },
    },
  );

  const data = res.data;

  return data ? formatUser(data) : undefined;
}

export async function getFollowersByUsername(
  username: string,
  page: number = 1,
  pageSize: number = 25,
) {
  const res = await axios.get<NonFormattedFollowType>(
    `${STRAPI_URL}/api/follows`,
    {
      params: {
        "filters[whomFollow][username][$eq]": username,
        populate: "whomFollow,whoFollow",
        "pagination[page]": page,
        "pagination[pageSize]": pageSize,
      },
    },
  );

  return formatFollow(res.data);
}

export async function getFollowingsByUsername(
  username: string,
  page: number = 1,
  pageSize: number = 25,
) {
  const res = await axios.get<NonFormattedFollowType>(
    `${STRAPI_URL}/api/follows`,
    {
      params: {
        "filters[whoFollow][username][$eq]": username,
        populate: "whomFollow,whoFollow",
        "pagination[page]": page,
        "pagination[pageSize]": pageSize,
      },
    },
  );

  return formatFollow(res.data);
}

export async function getFollowersCountByUsername(
  username: string,
): Promise<number> {
  const res = await axios.get<number>(
    `${STRAPI_URL}/api/follows/count/followers`,
    {
      params: {
        username,
      },
    },
  );

  return res.data;
}

export async function getFollowingsCountByUsername(
  username: string,
): Promise<number> {
  const res = await axios.get<number>(
    `${STRAPI_URL}/api/follows/count/followings`,
    {
      params: {
        username,
      },
    },
  );

  return res.data;
}

export async function getFollowByUsername(
  whomFollow: string,
  whoFollow?: string,
): Promise<number | null> {
  if (!whoFollow) {
    const authUser = await getMe();

    if (!authUser || authUser.username === whomFollow) {
      return null;
    }

    whoFollow = authUser.username;
  }

  const res = await axios.get<NonFormattedFollowType>(
    `${STRAPI_URL}/api/follows`,
    {
      params: {
        "filters[whoFollow][username][$eq]": whoFollow,
        "filters[whomFollow][username][$eq]": whomFollow,
      },
    },
  );

  const data = res.data.data;

  if (data.length === 0) {
    return null;
  }

  const followId = data[0].id;

  return followId;
}

export async function getFollowById(
  whomFollow: number,
  whoFollow?: number,
): Promise<number | null> {
  if (!whoFollow) {
    const authUser = await getMe();

    if (!authUser || authUser.id === whomFollow) {
      return null;
    }

    whoFollow = authUser.id;
  }

  const res = await axios.get<NonFormattedFollowType>(
    `${STRAPI_URL}/api/follows`,
    {
      params: {
        "filters[whoFollow][id][$eq]": whoFollow,
        "filters[whomFollow][id][$eq]": whomFollow,
      },
    },
  );

  const data = res.data.data;

  if (data.length === 0) {
    return null;
  }

  const followId = data[0].id;

  return followId;
}

export async function followUser(
  whomFollow: number,
  whoFollow: number,
): Promise<boolean> {
  try {
    await axios.post(
      `${STRAPI_URL}/api/follows`,
      { data: { whoFollow, whomFollow } },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${API_TOKEN}`,
        },
      },
    );
    return true;
  } catch (error) {
    return false;
  }
}

export async function unfollowUser(
  whomFollow: number,
  whoFollow: number,
): Promise<boolean> {
  try {
    const id = await getFollowById(whomFollow, whoFollow);

    if (!id) {
      return false;
    }

    await axios.delete(`${STRAPI_URL}/api/follows/${id}`, {
      headers: { Authorization: `Bearer ${API_TOKEN}` },
    });
    return true;
  } catch (error) {
    return false;
  }
}
