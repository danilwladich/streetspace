"use client";

import { useAuthStore } from "@/hooks/use-auth-store";
import { useClientFetching } from "@/hooks/use-client-fetching";
import { useLayoutEffect } from "react";
import type { UserType } from "@/types/UserType";

import { AppLoader } from "@/components/ui/app-loader";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { data, isLoading, error } = useClientFetching<UserType>(
    "/api/auth/me",
    {
      errorRetryCount: 0,
    },
  );
  const { isChecked, setUser } = useAuthStore();

  useLayoutEffect(() => {
    if (!error && data) {
      setUser(data);
    } else {
      setUser(null);
    }
  }, [data, error, setUser]);

  // First fetching loader
  if (isLoading || !isChecked) {
    return <AppLoader />;
  }

  return children;
}
