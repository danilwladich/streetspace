"use server";

import axios from "axios";

export async function verifyCaptcha(token: string): Promise<boolean> {
  const res = await axios.post(
    `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${token}`,
  );

  return res.data.success;
}

interface Address {
  road: string;
  city?: string;
  village?: string;
  postcode: string;
  country: string;
}

export async function reverseGeocode(
  lat: number,
  lng: number,
): Promise<{ address?: Address; success: boolean }> {
  const { data } = await axios.get<{ address: Address; error: any }>(
    `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`,
  );

  if (data.error || !data.address) {
    return { success: false };
  }

  return { address: data.address, success: true };
}
