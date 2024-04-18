import { getAppTitle } from "@/lib/get-app-title";
import { getUserByUsername } from "@/services/user";
import type { Metadata } from "next";

import NotFound from "@/components/common/not-found";
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

  if (!user) {
    return <NotFound text='User not found'/>
  }

  return (
    <Card>
      <CardContent>
        <User user={user} />
      </CardContent>
    </Card>
  );
}
