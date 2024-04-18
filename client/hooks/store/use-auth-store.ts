import type { User } from "@prisma/client";
import { create } from "zustand";

interface AuthStore {
  user: User | null;
  isChecked: boolean;
  setUser: (user: User | null) => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  isChecked: false,
  setUser: (user) => set({ user, isChecked: true }),
}));
