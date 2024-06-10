"use client";

import { Link } from "@/lib/navigation";
import { useAuthStore } from "@/hooks/store/use-auth-store";
import type { Prisma } from "@prisma/client";

import CommentAvatar from "./avatar";
import Actions from "./actions/actions";
import { Separator } from "@/components/ui/separator";
import { DateToShow } from "@/components/common/date-to-show";

type MarkerComment = Prisma.MarkerCommentGetPayload<{
  include: {
    commentedBy: {
      select: { id: true; username: true; avatar: true };
    };
  };
}>;

export default function Comment({
  id: commentId,
  commentedBy,
  message,
  createdAt,
}: MarkerComment) {
  const { id: ownerId, username, avatar } = commentedBy;

  const { user: authUser } = useAuthStore();

  const isOwner = ownerId === authUser?.id;

  return (
    <>
      <div className="flex items-start gap-2 p-2">
        <Link tabIndex={-1} href={`/profile/${username}`}>
          <CommentAvatar avatar={avatar} username={username} />
        </Link>

        <div className="flex-1 space-y-px text-sm">
          <div className="font-semibold">
            <Link href={`/profile/${username}`}>{username}</Link>
          </div>

          <p lang="" className="break-all">
            {message}
          </p>

          <div className="text-muted-foreground">
            <DateToShow date={createdAt} withTime />
          </div>
        </div>

        <Actions id={commentId} isOwner={isOwner} />
      </div>

      <Separator className="block last:hidden" />
    </>
  );
}
