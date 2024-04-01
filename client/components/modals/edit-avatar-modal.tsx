import EditAvatarForm from "@/components/forms/user/edit-avatar-form";

import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export default function EditAvatarModal() {
  return (
    <DialogContent className="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>Edit avatar</DialogTitle>
        <DialogDescription>Upload new profile image</DialogDescription>
      </DialogHeader>

      <EditAvatarForm />
    </DialogContent>
  );
}
