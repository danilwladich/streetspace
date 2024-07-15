"use client";

import axios, { AxiosError, AxiosResponse } from "axios";
import { useRouter } from "@/lib/navigation";
import { toast } from "sonner";
import { useAuthStore } from "@/hooks/store/use-auth-store";
import { useModalStore } from "@/hooks/store/use-modal-store";
import { useTranslations } from "next-intl";

import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";

export default function LogOutButton() {
  const t = useTranslations("pages.settings.logOut");

  const router = useRouter();
  const { setUser } = useAuthStore();
  const { onOpen } = useModalStore();

  function onLogOut() {
    const submitActionData = {
      description: t("description"),
      onSubmit: async () => {
        try {
          // Sending a DELETE request to the /api/auth/me endpoint
          await axios.delete("/api/auth/me");

          // Clearing the user from the store
          setUser(null);

          // Redirecting to the auth page
          router.push("/auth");
        } catch (e: unknown) {
          // Handling AxiosError
          const error = e as AxiosError;

          // Extracting response from AxiosError
          const res = error?.response as AxiosResponse<string, any>;

          // Handling non-response errors
          if (!res) {
            toast.error(t("submitError"), { description: error.message });
            return;
          }
        }
      },
    };
    onOpen("submit action", {
      submitActionData,
    });
  }

  return (
    <Button
      className="w-full justify-start gap-2"
      variant="ghost"
      size="sm"
      onClick={onLogOut}
    >
      <LogOut className="h-4 w-4" />
      <span>{t("submit")}</span>
    </Button>
  );
}
