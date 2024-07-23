import { getAppTitle } from "@/lib/get-app-title";
import { getUserByUsername } from "@/services/user";
import { getOpenGraphImages } from "@/lib/opengraph";
import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";

import NotFound from "@/components/common/not-found";
import ProfileMain from "@/components/pages/profile/main";
import Bio from "@/components/pages/profile/bio";
import UserInfo from "@/components/pages/profile/info";
import Visits from "@/components/pages/profile/visits/visits";

export async function generateMetadata({
  params: { username },
}: {
  params: { username: string };
}): Promise<Metadata> {
  const t = await getTranslations("pages.profile");

  const user = await getUserByUsername(username);

  if (!user) {
    return {
      title: getAppTitle(t("notFound")),
      robots: { index: false, follow: false },
    };
  }

  const title = getAppTitle(user.username);
  const description = t("description");
  const images = getOpenGraphImages(username, user.avatar);

  return {
    title,
    description,
    openGraph: {
      title,
      images,
      description,
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

      <Visits userId={user.id} username={username} />
    </>
  );
}
