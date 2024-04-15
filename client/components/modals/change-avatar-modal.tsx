import ChangeAvatarForm from "@/components/forms/user/change-avatar-form";

import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export default function ChangeAvatarModal() {
  return (
    <DialogContent className="sm:max-w-md">
      <DialogHeader>
        <DialogTitle>Change avatar</DialogTitle>
        <DialogDescription>Upload new profile image</DialogDescription>
      </DialogHeader>

      <ChangeAvatarForm />
    </DialogContent>
  );
}
