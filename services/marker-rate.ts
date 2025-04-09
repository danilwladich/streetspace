import { db } from "@/lib/db";
import { authValidation } from "@/lib/auth-validation";

export async function getAuthMarkerRate(markerId: string) {
  const authUser = await authValidation();

  if (!authUser) {
    return null;
  }

  const rate = await db.markerRate.findFirst({
    where: {
      markerId,
      userId: authUser.id,
    },
    select: {
      rate: true,
    },
  });

  if (!rate) {
    return null;
  }

  return rate.rate;
}

export async function createMarkerRate(
  markerId: string,
  userId: string,
  rate: number,
) {
  await db.markerRate.create({
    data: {
      markerId,
      userId,
      rate,
    },
  });
}

export async function updateMarkerRate(
  markerId: string,
  userId: string,
  rate: number,
) {
  await db.markerRate.updateMany({
    where: {
      markerId,
      userId,
    },
    data: {
      rate,
    },
  });
}
