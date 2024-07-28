"use client";

import { useAuthStore } from "@/hooks/store/use-auth-store";
import { useTranslations } from "next-intl";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import EditProfileForm from "@/components/forms/user/edit-profile/edit-profile-form";

export default function EditProfile() {
  const t = useTranslations("forms.editProfile");

  const { user: authUser } = useAuthStore();

  if (!authUser) {
    return null;
  }

  return (
    <Card className="max-w-md">
      <CardHeader>
        <CardTitle>
          <h1>{t("title")}</h1>
        </CardTitle>
        <CardDescription>{t("description")}</CardDescription>
      </CardHeader>

      <CardContent>
        <EditProfileForm />
      </CardContent>
    </Card>
  );
}
