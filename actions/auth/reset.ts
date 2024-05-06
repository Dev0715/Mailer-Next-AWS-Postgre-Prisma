"use server";

import * as z from "zod";

import { ResetSchema } from "@/schemas/auth";
import { getUserByEmail } from "@/data/user/user-by-email";
import { generateVerificationToken } from "@/lib/tokens";
import { updateUserToken } from "@/data/user/update-token";
import { sendPasswordResetEmail } from "../mail/send-password-reset";

export const reset = async (values: z.infer<typeof ResetSchema>) => {
  const validatedFields = ResetSchema.safeParse(values);
  if (!validatedFields.success) {
    return { error: "Invalid email!" };
  }

  const { email } = validatedFields.data;

  const existingUser = await getUserByEmail(email);
  if (!existingUser) {
    return { error: "Email not found!" };
  }

  const verificationToken = generateVerificationToken(email);

  const response = await updateUserToken({
    email,
    verificationToken,
    expires: new Date(new Date().getTime() + 3600 * 1000)
  });

  if (response.error) {
    return { error: "Server Error" };
  }

  const _response = await sendPasswordResetEmail(email, verificationToken);

  if (_response.error) {
    return { error: "Error occurred while sending email" };
  }

  return { success: "Reset email sent!" };
};
