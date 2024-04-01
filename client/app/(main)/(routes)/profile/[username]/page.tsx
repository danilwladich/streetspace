import { getAppTitle } from "@/lib/get-app-title";
import { getUserByUsername } from "@/lib/server-actions";
import type { Metadata } from "next";

import User from "@/components/pages/profile/user";
import { Card, CardContent } from "@/components/ui/card";

export async function generateMetadata({
  params,
}: {
  params: { username: string };
}): Promise<Metadata> {
  const data = await getUserByUsername(params.username);

  return {
    title: getAppTitle(data?.username || "User not found"),
  };
}

export default async function Profile({
  params,
}: {
  params: { username: string };
}) {
  const data = await getUserByUsername(params.username);

  if (!data) {
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
          <User {...data} />
        </CardContent>
      </Card>
    </div>
  );
}
