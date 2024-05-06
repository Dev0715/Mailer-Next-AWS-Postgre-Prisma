"use server";

import { sendEmail } from "@/data/email/send-email";

const fromEmail = "malachi.uudev@gmail.com";

export const sendTwoFactorTokenEmail = async (email: string, token: string) => {
  return await sendEmail({
    from: fromEmail,
    to: [email],
    subject: "2FA Code",
    html: `<p>Your 2FA code: ${token}</p>`
  });
};
