import { getUserProfile } from "@/services/user";
import { getTranslations } from "next-intl/server";
import { getPageMetadata } from "@/lib/metadata";
import type { Metadata } from "next";

import NotFound from "@/components/common/not-found";
import ProfileMain from "@/components/pages/profile/main";
import Bio from "@/components/pages/profile/bio";
import UserInfo from "@/components/pages/profile/info";
import Visits from "@/components/pages/profile/visits/visits";

export async function generateMetadata({
  params: { locale, username },
}: {
  params: { locale: string; username: string };
}): Promise<Metadata> {
  const t = await getTranslations("pages.profile");

  const user = await getUserProfile(username);

  if (!user) {
    return getPageMetadata({
      pageName: t("notFound"),
      robots: false,
    });
  }

  return getPageMetadata({
    path: `/profile/${username}`,
    pageName: username,
    description: t("description"),
    image: user.avatar,
    locale,
  });
}

export default async function Profile({
  params: { username },
}: {
  params: { username: string };
}) {
  const t = await getTranslations("pages.profile");

  const user = await getUserProfile(username);

  if (!user) {
    return <NotFound text={t("notFound")} />;
  }

  return (
    <>
      <ProfileMain {...user} />

      <Bio bio={user.bio} />

      <UserInfo {...user} />

      <Visits userId={user.id} username={username} />
    </>
  );
}
