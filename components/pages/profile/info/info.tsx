import type { User } from "@prisma/client";

import UserAvatar from "./avatar";

export default function Info(user: User) {
  return (
    <div className="flex w-full items-center gap-2 md:gap-4">
      <UserAvatar {...user} />

      <div className="overflow-hidden">
        <h2 className="truncate text-xl font-semibold">{user.username}</h2>
      </div>
    </div>
  );
}
