"use client";

import axios, { AxiosError, AxiosResponse } from "axios";
import { useState } from "react";
import { useRouter } from "@/lib/navigation";
import { toast } from "sonner";
import { useTranslations } from "next-intl";

import { UserPlus, UserMinus } from "lucide-react";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";

export default function FollowButton({
  id,
  username,
  isFollowing,
}: {
  id: string;
  username: string;
  isFollowing: boolean;
}) {
  const t = useTranslations("pages.profile.actions");

  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  async function onFollow(e: React.MouseEvent<HTMLDivElement>) {
    e.preventDefault();

    setIsLoading(true);

    try {
      if (isFollowing) {
        // Making a DELETE request to the follow API endpoint
        await axios.delete("/api/user/follow", { data: { userId: id } });
      } else {
        // Making a POST request to the follow API endpoint
        await axios.post("/api/user/follow", { userId: id });
      }

      // Refresh page to get new followers data
      router.refresh();
    } catch (e: unknown) {
      // Handling AxiosError
      const error = e as AxiosError;

      // Extracting response from AxiosError
      const res = error?.response as AxiosResponse<string, any>;

      // Handling non-response errors
      if (!res) {
        toast.error(t("followError"), { description: error.message });
        return;
      }

      if (res.status === 401) {
        router.push(`/auth?redirect=/profile/${username}`);
      }
    }

    setIsLoading(false);
  }

  const text = t(isFollowing ? "unfollow" : "follow");
  const icon = isFollowing ? (
    <UserMinus className="h-4 w-4" />
  ) : (
    <UserPlus className="h-4 w-4" />
  );

  return (
    <DropdownMenuItem disabled={isLoading} onClick={onFollow} className="gap-2">
      {icon}

      <span className="flex-1">{text}</span>
    </DropdownMenuItem>
  );
}
