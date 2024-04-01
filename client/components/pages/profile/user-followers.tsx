import Link from "next/link";
import type { FollowType } from "@/types/FollowType";

import { Button } from "@/components/ui/button";

export default function UserFollowers({
  username,
  followers,
  followings,
}: {
  username: string;
  followers: FollowType;
  followings: FollowType;
}) {
  return (
    <>
      <Link href={`/followers/${username}`} className="flex-1">
        <Button tabIndex={-1} variant="outline" className="w-full">
          Followers {followers.pagination.total}
        </Button>
      </Link>

      <Link href={`/followings/${username}`} className="flex-1">
        <Button tabIndex={-1} variant="outline" className="w-full">
          Followings {followings.pagination.total}
        </Button>
      </Link>
    </>
  );
}
