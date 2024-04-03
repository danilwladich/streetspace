import ChangeUsernameForm from "@/components/forms/user/change-username-form";

import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export default function ChangeProfileModal() {
  return (
    <DialogContent className="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>Change username</DialogTitle>
        <DialogDescription>Make your username unique</DialogDescription>
      </DialogHeader>

      <ChangeUsernameForm />
    </DialogContent>
  );
}
