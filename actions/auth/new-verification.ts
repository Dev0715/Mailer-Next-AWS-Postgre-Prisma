"use server";

import { getUserByEmail, updateUserVerification } from "@/data/user";
import { getEmailFromToken } from "@/lib/tokens";
// import { getVerificationTokenByToken } from "@/data/verificiation-token";

export const newVerification = async (token: string) => {
  if (!token || token.length <= 36) {
    return { error: "Missing token!" };
  }

  const userEmail = getEmailFromToken(token);
  console.log("__newVerification__getEmailFromToken", userEmail);

  const existingUser = await getUserByEmail(userEmail);
  if (!existingUser) {
    return { error: "Invalid Token!" };
  }

  const expires = Date.parse(existingUser.expires);
  if (expires < new Date().getTime()) {
    return { error: "Token is expired!" };
  }

  if (token !== existingUser.verificationToken) {
    return { error: "Invalid Token!" };
  }

  const updatedUser = await updateUserVerification(userEmail);
  if (!updatedUser) {
    return { error: "Server error!" };
  }

  return { success: "Email verified!" };
};