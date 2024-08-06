"use server";

import nodemailer from "nodemailer";

const MAIL_USER = process.env.MAIL_USER;
const MAIL_PASSWORD = process.env.MAIL_PASSWORD;
const MAIL_HOST = process.env.MAIL_HOST;

export async function sendMail({
  to,
  subject,
  html,
}: {
  to: string;
  subject: string;
  html: string;
}) {
  const transporter = nodemailer.createTransport({
    host: MAIL_HOST,
    port: 465,
    secure: true,
    auth: {
      user: MAIL_USER,
      pass: MAIL_PASSWORD,
    },
  });

  const mailOptions = {
    from: MAIL_USER,
    to,
    subject,
    html,
  };

  transporter.sendMail(mailOptions, (error) => {
    if (error) {
      throw new Error(error as unknown as string);
    }
  });
}
