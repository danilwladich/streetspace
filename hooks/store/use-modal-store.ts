import { create } from "zustand";

export type ModalType =
  | "change username"
  | "change password"
  | "change avatar"
  | "fullscreen images"
  | "submit action"
  | "report marker"
  | "new marker comment";

type ModalData = {
  imagesData?: {
    images: {
      src: string;
      alt: string;
    }[];
    startIndex?: number;
  };
  reportMarkerData?: {
    id: string;
  };
  submitActionData?: {
    description: string;
    onSubmit: () => void;
  };
  newMarkerCommentData?: {
    id: string;
    address: string;
  };
};

interface ModalStore {
  type: ModalType | null;
  data: ModalData | null;
  isOpen: boolean;
  onOpen: (type: ModalType, data?: ModalData | null) => void;
  onClose: () => void;
}

export const useModalStore = create<ModalStore>((set) => ({
  type: null,
  data: null,
  isOpen: false,
  onOpen: (type: ModalType, data: ModalData | null = null) =>
    set({ type, data, isOpen: true }),
  onClose: () => set({ type: null, data: null, isOpen: false }),
}));
