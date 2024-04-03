"use client";

import { useModalStore, ModalType } from "@/hooks/use-modal-store";
import ChangeUsernameModal from "@/components/modals/change-username-modal";
import ChangePasswordModal from "../modals/change-password-modal";
import ChangeAvatarModal from "../modals/change-avatar-modal";

import { Dialog } from "@/components/ui/dialog";

const modalsMap: { [key in ModalType]: JSX.Element } = {
  "change username": <ChangeUsernameModal />,
  "change password": <ChangePasswordModal />,
  "change avatar": <ChangeAvatarModal />,
};

export function ModalProvider() {
  const { isOpen, type, onClose } = useModalStore();

  if (!type || !isOpen) {
    return null;
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      {modalsMap[type]}
    </Dialog>
  );
}
