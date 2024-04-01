"use client";

import { useModalStore, ModalType } from "@/hooks/use-modal-store";
import EditUsernameModal from "@/components/modals/edit-username-modal";
import ChangePasswordModal from "../modals/change-password-modal";
import EditAvatarModal from "../modals/edit-avatar-modal";

import { Dialog } from "@/components/ui/dialog";

const modalsMap: { [key in ModalType]: JSX.Element } = {
  "edit username": <EditUsernameModal />,
  "change password": <ChangePasswordModal />,
  "edit avatar": <EditAvatarModal />,
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
