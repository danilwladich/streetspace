import { WithTrans } from "@/components/common/with-trans";

import LoginForm from "@/components/forms/auth/login-form";
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
            <WithTrans ns="forms" k="signIn.title" />
          </CardTitle>
          <CardDescription>
            <WithTrans ns="forms" k="signIn.description" />
          </CardDescription>
        </CardHeader>

        <CardContent>
          <LoginForm />
        </CardContent>
      </Card>

      <Card className="max-w-md">
        <CardContent>
          <Link href="/auth/register" className="block">
            <Button tabIndex={-1} variant="outline" className="w-full">
              <WithTrans ns="forms" k="signUp.title" />
            </Button>
          </Link>
        </CardContent>
      </Card>
    </>
  );
}
