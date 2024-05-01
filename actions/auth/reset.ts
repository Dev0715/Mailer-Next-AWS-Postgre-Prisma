"use server";

import * as z from "zod";

import { ResetSchema } from "@/schemas/auth";
import { getUserByEmail } from "@/data/user/user-by-email";
import { sendPasswordResetEmail } from "@/lib/mail";
import { generateVerificationToken } from "@/lib/tokens";
import { updateUserToken } from "@/data/user/update-token";

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

  const updatedUser = await updateUserToken({
    email,
    verificationToken,
    expires: new Date(new Date().getTime() + 3600 * 1000)
  });

  if (!updatedUser) {
    return { error: "Server Error" };
  }

  const response = await sendPasswordResetEmail(
    updatedUser.email,
    updatedUser.verificationToken
  );

  if (response.error) {
    return { error: response.error.name };
  }

  return { success: "Reset email sent!" };
};
