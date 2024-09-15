import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Link,
  Preview,
  Section,
  Tailwind,
  Text,
} from "@react-email/components";
import { getAppTitle } from "@/lib/get-app-title";
import { cn } from "@/lib/utils";
import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600"],
  display: "swap",
  adjustFontFallback: false,
});

const URL_BASE = process.env.NEXT_PUBLIC_URL_BASE;

export function ConfirmSignUpEmail({
  token,
  email,
  locale,
  t,
}: {
  token: string;
  email: string;
  locale: string;
  t: (key: string, data?: Record<string, string>) => string;
}) {
  return (
    <>
      <Html lang={locale}>
        <Head>
          <title>{t("subject")}</title>
        </Head>

        <Preview>{t("subject")}</Preview>

        <Tailwind>
          <Body className={cn(inter.className, "bg-white text-sm text-[#333]")}>
            <Container className="mx-auto bg-[#eee] p-5">
              <Section className="bg-white">
                <Section className="bg-black p-5 text-3xl text-white">
                  {getAppTitle()}
                </Section>

                <Section className="px-8 py-6">
                  <Heading className="text-xl font-bold">
                    {t("subject")}
                  </Heading>

                  <Text className="m-0 my-6">
                    {t("main")}
                    <Link
                      href={`${URL_BASE}/auth/register/confirm?email=${email}`}
                      target="_blank"
                      className="text-[#2754C5] underline"
                    >
                      {URL_BASE}
                    </Link>
                  </Text>

                  <Section className="w-full">
                    <Text className="m-0 text-center font-bold">
                      {t("code")}
                    </Text>

                    <Text className="m-0 my-2 text-center text-4xl font-bold">
                      {token}
                    </Text>
                    <Text className="m-0 text-center">{t("valid")}</Text>
                  </Section>
                </Section>

                <Hr />

                <Section className="px-8 py-6">
                  <Text className="m-0">{t("ignore")}</Text>
                </Section>
              </Section>

              <Text className="px-5 text-xs">
                {t("copyright", { title: getAppTitle() })}
                <Link
                  href={URL_BASE}
                  target="_blank"
                  className="text-[#2754C5] underline"
                >
                  {URL_BASE}
                </Link>
              </Text>
            </Container>
          </Body>
        </Tailwind>
      </Html>
    </>
  );
}
