import React from "react";
import ReCAPTCHA from "react-google-recaptcha";

const Recaptcha = React.forwardRef<ReCAPTCHA>(({}, ref) => {
  return (
    <ReCAPTCHA
      className="fixed bottom-10 right-0 translate-x-0 translate-y-0 md:bottom-0"
      ref={ref}
      size="invisible"
      sitekey="6LcwYyQkAAAAAMsq2VnRYkkqNqLt-ljuy-gfmPYn"
    />
  );
});

Recaptcha.displayName = "Recaptcha";

export default Recaptcha;
