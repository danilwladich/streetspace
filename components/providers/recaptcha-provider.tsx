"use client";

import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";
import { useParams } from "next/navigation";

const SITE_KEY = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || "sitekey";

export default function RecaptchaProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { locale } = useParams();

  return (
    <GoogleReCaptchaProvider
      reCaptchaKey={SITE_KEY}
      language={locale as string}
      container={{
        parameters: {
          badge: "bottomright",
        },
      }}
    >
      {children}
    </GoogleReCaptchaProvider>
  );
}
