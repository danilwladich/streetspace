import { Html, Tailwind, Head, Text, Hr, Link } from "@react-email/components";

const URL_BASE = process.env.NEXT_PUBLIC_URL_BASE;

export function ConfirmSignUpEmail({
  token,
  email,
}: {
  token: string;
  email: string;
}) {
  return (
    <Html lang="en">
      <Head>
        <title>Confirm sign up | streetspace</title>
      </Head>

      <Tailwind>
        <Text>
          Your sign up token: <b>{token}</b>
        </Text>

        <Text>Token valid for 10 minutes</Text>

        <Hr />

        <Text>
          Confirm action on the following link:
          <br />
          <Link href={`${URL_BASE}/auth/register/confirm?email=${email}`}>
            {URL_BASE}
          </Link>
        </Text>

        <Text className="opacity-70">
          If you did not sign up for our service, you can ignore this email.
        </Text>
      </Tailwind>
    </Html>
  );
}
