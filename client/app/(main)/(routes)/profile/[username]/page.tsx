import { getAppTitle } from "@/lib/get-app-title";
import {
  getFollowersByUsername,
  getFollowingsByUsername,
  getUserByUsername,
} from "@/lib/server-actions";
import type { Metadata } from "next";

import User from "@/components/pages/profile/user";
import { Card, CardContent } from "@/components/ui/card";

export async function generateMetadata({
  params,
}: {
  params: { username: string };
}): Promise<Metadata> {
  const user = await getUserByUsername(params.username);

  return {
    title: getAppTitle(user?.username || "User not found"),
  };
}

export default async function Profile({
  params,
}: {
  params: { username: string };
}) {
  const user = await getUserByUsername(params.username);
  const followers = await getFollowersByUsername(params.username);
  const followings = await getFollowingsByUsername(params.username);

  if (!user) {
    return (
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform">
        <h2 className="text-xl">User not found</h2>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4 pt-2 md:pt-0">
      <Card>
        <CardContent>
          <User user={user} followers={followers} followings={followings} />
        </CardContent>
      </Card>
    </div>
  );
}
