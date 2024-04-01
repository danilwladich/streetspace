"use server";

import axios from "axios";
import { formatFollow, formatUser } from "@/lib/format-data";
import { getJwt } from "./get-jwt";
import type { NonFormattedUserType, UserType } from "@/types/UserType";
import type { NonFormattedFollowType } from "@/types/FollowType";

export async function verifyCaptcha(token: string): Promise<boolean> {
  const res = await axios.post(
    `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${token}`,
  );
  return res.data.success;
}

export async function getMe(): Promise<UserType | null> {
  const res = await fetch(
    `${process.env.STRAPI_URL}/api/users/me?populate=role,avatar`,
    {
      method: "GET",
      headers: { Authorization: `Bearer ${getJwt()}` },
    },
  );
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
  const res = await fetch(
    `${process.env.STRAPI_URL}/api/auth/local?populate=role,avatar`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        identifier,
        password,
      }),
    },
  );
  const data = await res.json();

  if (data.error) {
    return null;
  }

  return { user: formatUser(data.user), jwt: data.jwt };
}

export async function register(
  username: string,
  email: string,
  password: string,
): Promise<{ user: UserType; jwt: string } | null> {
  const res = await fetch(`${process.env.STRAPI_URL}/api/auth/local/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username,
      email,
      password,
    }),
  });
  const data = await res.json();

  if (data.error) {
    return null;
  }

  return { user: formatUser(data.user), jwt: data.jwt };
}

export async function changePassword(
  currentPassword: string,
  password: string,
  passwordConfirmation: string,
): Promise<{ error?: string; success: boolean }> {
  const res = await fetch(
    `${process.env.STRAPI_URL}/api/auth/change-password`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getJwt()}`,
      },
      body: JSON.stringify({
        currentPassword,
        password,
        passwordConfirmation,
      }),
    },
  );
  const data = await res.json();

  if (data.error) {
    return { error: data.error.message, success: false };
  }

  return { success: true };
}

export async function getUserByUsername(
  username: string,
): Promise<UserType | undefined> {
  const res = await axios.get<(NonFormattedUserType | undefined)[]>(
    `${process.env.STRAPI_URL}/api/users`,
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
  const res = await axios.get<(NonFormattedUserType | undefined)[]>(
    `${process.env.STRAPI_URL}/api/user/${id}`,
    {
      params: {
        populate: "avatar",
      },
    },
  );

  const data = res.data[0];

  return data ? formatUser(data) : undefined;
}

export async function getFollowersByUsername(
  username: string,
  page: number = 1,
  pageSize: number = 25,
) {
  const res = await axios.get<NonFormattedFollowType>(
    `${process.env.STRAPI_URL}/api/follows`,
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
    `${process.env.STRAPI_URL}/api/follows`,
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
