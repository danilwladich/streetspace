"use client";

import { useModalStore, ModalType } from "@/hooks/store/use-modal-store";

import { Dialog } from "@/components/ui/dialog";
import ChangeUsernameModal from "@/components/modals/change-username-modal";
import ChangePasswordModal from "@/components/modals/change-password-modal";
import ChangeAvatarModal from "@/components/modals/change-avatar-modal";
import FullscreenImagesModal from "../modals/fullscreen-images/fullscreen-images-modal";
import SubmitActionModal from "@/components/modals/submit-action-modal";
import ReportMarkerModal from "@/components/modals/report-marker-modal";
import NewMarkerCommentModal from "@/components/modals/new-marker-comment-modal";

const modalsMap: { [key in ModalType]: JSX.Element } = {
  "change username": <ChangeUsernameModal />,
  "change password": <ChangePasswordModal />,
  "change avatar": <ChangeAvatarModal />,
  "fullscreen images": <FullscreenImagesModal />,
  "submit action": <SubmitActionModal />,
  "report marker": <ReportMarkerModal />,
  "new marker comment": <NewMarkerCommentModal />,
};

export function ModalProvider() {
  const { isOpen, type, onClose } = useModalStore();

  if (!type) {
    return null;
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      {modalsMap[type]}
    </Dialog>
  );
}
