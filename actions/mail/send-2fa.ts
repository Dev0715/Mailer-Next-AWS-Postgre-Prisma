"use server";

import { sendEmail } from "@/data/email/send-email";

const fromEmail = process.env.SITE_OWNER_EMAIL as string;

export const sendTwoFactorTokenEmail = async (email: string, token: string) => {
  return await sendEmail({
    from: fromEmail,
    to: [email],
    subject: "2FA Code",
    html: `<p>Your 2FA code: ${token}</p>`
  });
};
