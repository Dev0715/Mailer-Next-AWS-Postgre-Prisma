"use server";

import { sendEmail } from "@/data/email/send-email";

const domain = process.env.NEXT_PUBLIC_APP_URL;
const fromEmail = "malachi.uudev@gmail.com";

export const sendPasswordResetEmail = async (email: string, token: string) => {
  const resetLink = `${domain}/auth/new-password?token=${token}`;

  return await sendEmail({
    from: fromEmail,
    to: [email],
    subject: "Reset your password",
    html: `<p>Click <a href="${resetLink}">here</a> to reset password.</p>`
  });
};
