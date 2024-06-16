import { Link } from "@/lib/navigation";
import { checkIsFollowingById } from "@/services/follow";
import type { User } from "@prisma/client";

import { Separator } from "@/components/ui/separator";
import Avatar from "@/components/ui/avatar";
import Actions from "@/components/pages/profile/actions/actions";

export default async function User({
  user,
  authUser,
}: {
  user: User;
  authUser: User | undefined;
}) {
  const { id, username, avatar } = user;

  const isFollowing = authUser
    ? await checkIsFollowingById(authUser.id, id)
    : false;

  const isOwner = id === authUser?.id;

  return (
    <>
      <div className="relative flex w-full items-center gap-2 p-2">
        <Link tabIndex={-1} href={`/profile/${username}`}>
          <Avatar
            avatar={avatar}
            username={username}
            width={65}
            height={65}
            className="w-12 md:w-16"
          />
        </Link>

        <span className="flex-1 truncate font-semibold">
          <Link href={`/profile/${username}`}>{username}</Link>
        </span>

        {!isOwner && <Actions {...user} isFollowing={isFollowing} />}
      </div>

      <Separator className="block last:hidden" />
    </>
  );
}
