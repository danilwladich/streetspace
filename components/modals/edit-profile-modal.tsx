import EditProfileForm from "@/components/forms/user/edit-profile-form";

import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export default function EditProfileModal() {
  return (
    <DialogContent className="sm:max-w-md">
      <DialogHeader>
        <DialogTitle>Edit profile</DialogTitle>
        <DialogDescription>Make changes to your profile.</DialogDescription>
      </DialogHeader>

      <EditProfileForm />
    </DialogContent>
  );
}
