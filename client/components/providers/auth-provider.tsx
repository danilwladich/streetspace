"use client";

import { type UserType, useAuthStore } from "@/hooks/use-auth-store";
import { useClientFetching } from "@/hooks/use-client-fetching";

import { AppLoader } from "@/components/ui/app-loader";
import { useEffect } from "react";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { data, isLoading, error } = useClientFetching<UserType>(
    "/api/auth/me",
    {
      errorRetryCount: 0,
    },
  );
  const { isChecked, setUser } = useAuthStore();

  useEffect(() => {
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
