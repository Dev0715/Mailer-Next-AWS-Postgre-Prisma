"use server";

import { sendEmail } from "@/data/email/send-email";

const fromEmail = process.env.SITE_OWNER_EMAIL as string;

export const sendOtpValidationEmail = async (email: string, otp: string) => {
  return await sendEmail({
    from: fromEmail,
    to: [email],
    subject: "Confirm your OTP",
    html: `<p>Your OTP for validation is ${otp}</p>`
  });
};
