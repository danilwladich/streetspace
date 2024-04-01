import { create } from "zustand";

export type UserType = {
  id: number;
  username: string;
  email: string;
  role?: {
    type: "admin";
  };
} | null;

interface AuthStore {
  user: UserType;
  isChecked: boolean;
  setUser: (user: UserType) => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  isChecked: false,
  setUser: (user) => set({ user, isChecked: true }),
}));
