"use server";

import axios from "axios";
import { formatUser } from "@/lib/format-user";
import { getJwt } from "./get-jwt";
import type { NonFormattedUserType, UserType } from "@/types/UserType";

export async function verifyCaptcha(token: string): Promise<boolean> {
  const res = await axios.post(
    `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${token}`,
  );
  return res.data.success;
}

export async function getMe() {
  const res = await axios.get(
    `${process.env.STRAPI_URL}/api/users/me?populate=role,avatar`,
    {
      headers: { Authorization: `Bearer ${getJwt()}` },
    },
  );

  return res.data;
}

export async function login(identifier: string, password: string) {
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

  return data;
}

export async function register(
  username: string,
  email: string,
  password: string,
) {
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

  return data;
}

export async function getUserByUsername(
  username: string,
): Promise<UserType | undefined> {
  const res = await axios.get<(NonFormattedUserType | undefined)[]>(
    `${process.env.STRAPI_URL}/api/users?filters[username][$eq]=${username}&populate=avatar`,
  );

  const data = res.data[0];

  return data ? formatUser(data) : undefined;
}

export async function getFollowDataByUsername(username: string) {
  const res = await axios.get(
    `${process.env.STRAPI_URL}/api/users?filters[username][$eq]=${username}&populate=followers,followings`,
  );

  return res.data[0];
}
