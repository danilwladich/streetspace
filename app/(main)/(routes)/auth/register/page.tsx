import { WithTrans } from "@/components/common/with-trans";

import RegisterForm from "@/components/forms/auth/register-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Auth() {
  return (
    <>
      <Card className="max-w-md">
        <CardHeader>
          <CardTitle>
            <WithTrans ns="forms" k="signUp.title" />
          </CardTitle>
          <CardDescription>
            <WithTrans ns="forms" k="signUp.description" />
          </CardDescription>
        </CardHeader>
        <CardContent>
          <RegisterForm />
        </CardContent>
      </Card>

      <Card className="max-w-md">
        <CardContent>
          <Link href="/auth" className="block">
            <Button tabIndex={-1} variant="outline" className="w-full">
              <WithTrans ns="forms" k="signIn.title" />
            </Button>
          </Link>
        </CardContent>
      </Card>
    </>
  );
}
