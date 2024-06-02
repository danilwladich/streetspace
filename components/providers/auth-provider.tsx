"use client";

import { useAuthStore } from "@/hooks/store/use-auth-store";
import { useClientFetching } from "@/hooks/use-client-fetching";
import { useEffect } from "react";
import type { User } from "@prisma/client";

import { AppLoader } from "@/components/ui/app-loader";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { data, isLoading, error } = useClientFetching<User>("/api/auth/me", {
    errorRetryCount: 0,
  });
  const { setUser } = useAuthStore();

  useEffect(() => {
    if (isLoading) {
      return;
    }

    if (error || !data) {
      setUser(null);
      return;
    }

    setUser(data);
  }, [isLoading, data, error, setUser]);

  if (isLoading) {
    return <AppLoader />;
  }

  return children;
}
