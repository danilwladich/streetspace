"use server";

import axios from "axios";
import { formatUser } from "@/lib/format-user";
import type { NonFormattedUserType, UserType } from "@/types/UserType";

export async function verifyCaptcha(token: string): Promise<boolean> {
  const res = await axios.post(
    `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${token}`,
  );
  return res.data.success;
}

export async function getUserByUsername(
  username: string,
): Promise<UserType | undefined> {
  const res = await axios.get<NonFormattedUserType[]>(
    `${process.env.STRAPI_URL}/api/users?filters[username][$eq]=${username}&populate=avatar`,
  );

  const data = res.data[0];

  return formatUser(data);
}
