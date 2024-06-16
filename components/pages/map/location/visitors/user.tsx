import { Link } from "@/lib/navigation";

import Avatar from "@/components/ui/avatar";

export default function VisitorUser({
  username,
  avatar,
}: {
  username: string;
  avatar: string | null;
}) {
  return (
    <Link
      href={`/profile/${username}`}
      className="flex flex-col items-center justify-center gap-1 overflow-hidden"
    >
      <Avatar
        avatar={avatar}
        username={username}
        width={65}
        height={65}
        className="w-full max-w-16"
      />

      <span className="inline-block w-full truncate text-center text-sm font-semibold">
        {username}
      </span>
    </Link>
  );
}
