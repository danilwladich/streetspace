import { db } from "@/lib/db";
import type { NextRequest } from "next/server";
import { editAvatarSchema } from "@/lib/form-schema";
import { jsonResponse } from "@/lib/json-response";
import { getAuthUser } from "@/lib/get-auth-user";
import { serializeJwt } from "@/lib/serialize-jwt";
import { parseJsonFromFormData } from "@/lib/formdata-parser";
import path from "path";
import fs from "fs/promises";

export async function PATCH(req: NextRequest) {
	try {
		// Parsing and validating the request body
		const data = parseJsonFromFormData(await req.formData());
		const body = editAvatarSchema.safeParse(data);

		// Handling validation errors
		if (!body.success) {
			return jsonResponse("Validation Error", 400);
		}

		const { image } = body.data as { image: File };

		const authUser = getAuthUser(req);

		// Creating the file path for the user's avatar
		const filepath = path.join(
			process.cwd(),
			"public/images/users",
			authUser.id,
			"avatar"
		);

		// Create directory if it doesn't exist
		try {
			await fs.access(filepath);
		} catch {
			await fs.mkdir(filepath, { recursive: true });
		}

		// Delete old avatar
		const files = await fs.readdir(filepath);
		for (const file of files) {
			await fs.unlink(path.join(filepath, file));
		}

		// Reading and save the new avatar image
		const imageBuffer = Buffer.from(await image.arrayBuffer());
		const filename = `${Date.now()}_${image.name.replaceAll(" ", "_")}`;

		await fs.writeFile(path.join(filepath, filename), imageBuffer);

		// Setting the new imageUrl for the user
		const imageUrl = path.join(
			"/images/users",
			authUser.id,
			"avatar",
			filename
		);

		// Updating the user's avatar
		const user = await db.user.update({
			where: {
				id: authUser.id,
			},
			data: {
				imageUrl,
			},
		});

		// Serializing the user object into a JWT token
		const userWithoutPassword = { ...user, password: undefined };
		const serialized = await serializeJwt(userWithoutPassword);

		// Returning a JSON response with user information and set cookie header
		return jsonResponse(userWithoutPassword, 200, {
			headers: { "Set-Cookie": serialized },
		});
	} catch (error) {
		// Handling internal error
		console.log("[USER_AVATAR_PATCH]", error);
		return jsonResponse("Internal Error", 500);
	}
}
