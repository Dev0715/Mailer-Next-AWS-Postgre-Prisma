"use server";

import { sendEmail } from "@/data/email/send-email";

const domain = process.env.NEXT_PUBLIC_APP_URL;
const fromEmail = "malachi.uudev@gmail.com";

export const sendVerificationEmail = async (email: string, token: string) => {
  const confirmLink = `${domain}/auth/new-verification?token=${token}`;

  return await sendEmail({
    from: fromEmail,
    to: [email],
    subject: "Confirm your email",
    html: `<p>Click <a href="${confirmLink}">here</a> to confirm email.</p>`
  });
};
