import type { Prisma } from "@prisma/client";

export type UserProfile = Prisma.UserGetPayload<{
	select: {
		id: true,
		username: true,
		email: true,
		avatar: true,
		bio: true,
		dateOfBirth: true,
		coords: true,
		country: true,
		city: true,
		blocked: true,
		socialMedia: true,
		createdAt: true,
	},
}>;
