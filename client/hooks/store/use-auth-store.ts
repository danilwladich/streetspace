import type { UserType } from "@/types/UserType";
import { create } from "zustand";

interface AuthStore {
  user: UserType | null;
  isChecked: boolean;
  setUser: (user: UserType | null) => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  isChecked: false,
  setUser: (user) => set({ user, isChecked: true }),
}));
