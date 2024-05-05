import React from "react";
import ReCAPTCHA from "react-google-recaptcha";

const SITE_KEY = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || "sitekey";

const Recaptcha = React.forwardRef<ReCAPTCHA>(({}, ref) => {
  return (
    <ReCAPTCHA
      className="fixed bottom-10 right-0 translate-x-0 translate-y-0 md:bottom-0"
      ref={ref}
      size="invisible"
      sitekey={SITE_KEY}
    />
  );
});

Recaptcha.displayName = "Recaptcha";

export default Recaptcha;
