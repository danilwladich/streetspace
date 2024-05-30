"use client";

import { useModalStore, ModalType } from "@/hooks/store/use-modal-store";

import EditProfileModal from "@/components/modals/edit-profile-modal";
import ChangeUsernameModal from "@/components/modals/change-username-modal";
import ChangePasswordModal from "@/components/modals/change-password-modal";
import ChangeAvatarModal from "@/components/modals/change-avatar-modal";
import FullscreenImagesModal from "../modals/fullscreen-images/fullscreen-images-modal";
import DeleteAvatarModal from "@/components/modals/delete-avatar-modal";
import ReportMarkerModal from "@/components/modals/report-marker-modal";
import { Dialog } from "@/components/ui/dialog";

const modalsMap: { [key in ModalType]: JSX.Element } = {
  "edit profile": <EditProfileModal />,
  "change username": <ChangeUsernameModal />,
  "change password": <ChangePasswordModal />,
  "change avatar": <ChangeAvatarModal />,
  "fullscreen images": <FullscreenImagesModal />,
  "delete avatar": <DeleteAvatarModal />,
  "report marker": <ReportMarkerModal />,
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
