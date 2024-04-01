import EditUsernameForm from "@/components/forms/user/edit-username-form";

import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export default function EditProfileModal() {
  return (
    <DialogContent className="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>Edit username</DialogTitle>
        <DialogDescription>Make your username unique</DialogDescription>
      </DialogHeader>

      <EditUsernameForm />
    </DialogContent>
  );
}
