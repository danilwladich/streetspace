import { create } from "zustand";

export type ModalType =
  | "change username"
  | "change password"
  | "change avatar"
  | "image"
  | "delete avatar";

type ModalData = {
  src: string;
  alt: string;
} | null;

interface ModalStore {
  type: ModalType | null;
  data: ModalData;
  isOpen: boolean;
  onOpen: (type: ModalType, data?: ModalData) => void;
  onClose: () => void;
}

export const useModalStore = create<ModalStore>((set) => ({
  type: null,
  data: null,
  isOpen: false,
  onOpen: (type: ModalType, data: ModalData = null) =>
    set({ type, data, isOpen: true }),
  onClose: () => set({ type: null, data: null, isOpen: false }),
}));
