"use server";

import axios from "axios";

export async function verifyCaptcha(token: string): Promise<boolean> {
  const res = await axios.post(
    `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${token}`,
  );

  return res.data.success;
}

export async function reverseGeocode(
  lat: number,
  lng: number,
): Promise<{ address?: string; success: boolean }> {
  const { data } = await axios.get(
    `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`,
  );

  if (data.error || !data.address) {
    return { success: false };
  }

  const { road, city, village, postcode, country } = data.address;
  const address = `${road}, ${city || village}, ${postcode}, ${country}`;

  return { address, success: true };
}
