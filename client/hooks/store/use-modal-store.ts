import { create } from "zustand";

export type ModalType =
  | "change username"
  | "change password"
  | "change avatar"
  | "image";

interface ModalStore {
  type: ModalType | null;
  data: any;
  isOpen: boolean;
  onOpen: (type: ModalType, data?: any) => void;
  onClose: () => void;
}

export const useModalStore = create<ModalStore>((set) => ({
  type: null,
  data: null,
  isOpen: false,
  onOpen: (type: ModalType, data: any = null) =>
    set({ type, data, isOpen: true }),
  onClose: () => set({ type: null, data: null, isOpen: false }),
}));
