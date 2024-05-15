"use server";

import { getAllIdentities } from "@/data/email/all-identities";

export const checkIdentityStatus = async (email: string) => {
  const res = await getAllIdentities();
  if (res.error) {
    return { error: "Failed to get identities" };
  }

  const identities = res.identities as string[];
  for (const identity of identities) {
    if (isEmailValid(identity) && identity === email) {
      return true;
    }
  }

  return false;
};

const isEmailValid = (email: string) => {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailPattern.test(email);
};
