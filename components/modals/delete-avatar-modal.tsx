import DeleteAvatarActions from "@/components/forms/user/delete-avatar-actions";

import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

export default function DeleteAvatarModal() {
  return (
    <DialogContent className="sm:max-w-md">
      <DialogHeader>
        <DialogTitle>Are you absolutely sure?</DialogTitle>
        <DialogDescription>
          This will permanently delete your avatar.
        </DialogDescription>
      </DialogHeader>

      <DialogFooter>
        <DeleteAvatarActions />
      </DialogFooter>
    </DialogContent>
  );
}
