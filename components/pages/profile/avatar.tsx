"use client";

import axios, { AxiosError } from "axios";
import { useModalStore } from "@/hooks/store/use-modal-store";
import { useAuthStore } from "@/hooks/store/use-auth-store";
import { useTranslations } from "next-intl";
import { useRouter } from "@/lib/navigation";
import { toast } from "sonner";
import type { User } from "@prisma/client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Avatar from "@/components/ui/avatar";
import { Fullscreen, ImagePlus, Trash2 } from "lucide-react";

export default function UserAvatar({ id, username, avatar }: User) {
  const t = useTranslations("pages.profile.avatar");

  const router = useRouter();

  const { onOpen } = useModalStore();
  const { user: authUser, setUser } = useAuthStore();

  const isOwner = id === authUser?.id;

  const isDefaultAvatar = !avatar;

  function onPreviewOpen() {
    if (!avatar) return;

    const imagesData = {
      images: [{ src: avatar, alt: username }],
    };
    onOpen("fullscreen images", { imagesData });
  }

  function onDeleteAvatar() {
    const submitActionData = {
      description: t("delete.description"),
      onSubmit: async () => {
        try {
          // Making a DELETE request to the user avatar API endpoint
          const { data } = await axios.delete("/api/user/avatar");

          // Updating the user state with the new avatar
          setUser(data);

          router.refresh();
        } catch (e: unknown) {
          // Handling AxiosError
          const error = e as AxiosError;

          toast.error(t("delete.submitError"), { description: error.message });
          return;
        }
      },
    };
    onOpen("submit action", {
      submitActionData,
    });
  }

  return (
    <div className="h-24 w-24 md:h-36 md:w-36">
      {isOwner && (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="relative h-full w-full rounded-full">
              <Avatar
                avatar={avatar}
                username={username}
                width={145}
                height={145}
              />
            </button>
          </DropdownMenuTrigger>

          <DropdownMenuContent className="w-56">
            <DropdownMenuLabel>{t("title")}</DropdownMenuLabel>

            <DropdownMenuSeparator />

            <DropdownMenuGroup>
              {!isDefaultAvatar && (
                <DropdownMenuItem onClick={onPreviewOpen}>
                  <Fullscreen className="mr-2 h-4 w-4" />
                  <span>{t("fullscreen")}</span>
                </DropdownMenuItem>
              )}

              <DropdownMenuItem onClick={() => onOpen("change avatar")}>
                <ImagePlus className="mr-2 h-4 w-4" />
                <span>{t("change")}</span>
              </DropdownMenuItem>

              {!isDefaultAvatar && (
                <DropdownMenuItem onClick={onDeleteAvatar}>
                  <Trash2 className="mr-2 h-4 w-4" />
                  <span>{t("delete.button")}</span>
                </DropdownMenuItem>
              )}
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      )}

      {!isOwner && !isDefaultAvatar && (
        <button
          onClick={() => onPreviewOpen()}
          className="relative h-full w-full rounded-full"
        >
          <Avatar
            avatar={avatar}
            username={username}
            width={145}
            height={145}
          />
        </button>
      )}

      {!isOwner && isDefaultAvatar && (
        <Avatar avatar={avatar} username={username} width={145} height={145} />
      )}
    </div>
  );
}
