import { getAppTitle } from "@/lib/get-app-title";
import { getUserByUsername } from "@/services/user";
import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";

import NotFound from "@/components/common/not-found";
import ProfileMain from "@/components/pages/profile/main";
import Bio from "@/components/pages/profile/bio";
import UserInfo from "@/components/pages/profile/info";

export async function generateMetadata({
  params: { username },
}: {
  params: { username: string };
}): Promise<Metadata> {
  const t = await getTranslations("pages.profile");

  const user = await getUserByUsername(username);

  return {
    title: getAppTitle(user?.username || t("notFound")),
    openGraph: {
      title: getAppTitle(user?.username || t("notFound")),
    },
  };
}

export default async function Profile({
  params: { username },
}: {
  params: { username: string };
}) {
  const t = await getTranslations("pages.profile");

  const user = await getUserByUsername(username);

  if (!user) {
    return <NotFound text={t("notFound")} />;
  }

  return (
    <>
      <ProfileMain {...user} />

      <Bio bio={user.bio} />

      <UserInfo {...user} />
    </>
  );
}
