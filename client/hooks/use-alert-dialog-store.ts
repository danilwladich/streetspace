import { create } from "zustand";

export type AlertDialogType = "";

interface AlertDialogStore {
  type: AlertDialogType | null;
  isOpen: boolean;
  onContinue: ((...args: any) => any) | null;
  onOpen: (type: AlertDialogType, onContinue: (...args: any) => any) => void;
  onClose: () => void;
}

export const useAlertDialogStore = create<AlertDialogStore>((set) => ({
  type: null,
  isOpen: false,
  onContinue: null,
  onOpen: (type: AlertDialogType, onContinue: (...args: any) => any) =>
    set({ type, onContinue, isOpen: true }),
  onClose: () => set({ type: null, onContinue: null, isOpen: false }),
}));
