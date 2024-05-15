"use server";

import { sendEmail } from "@/data/email/send-email";

const fromEmail = process.env.SITE_OWNER_EMAIL as string;

export const sendOtpUnSubEmail = async (email: string, otp: string) => {
  return await sendEmail({
    from: fromEmail,
    to: [email],
    subject: "Confirm your OTP",
    html: `<p>Your OTP for unSubscription is ${otp}</p>`
  });
};
