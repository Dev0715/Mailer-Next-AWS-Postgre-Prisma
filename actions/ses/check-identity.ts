"use server";

import { getAllIdentities } from "@/data/email/all-identities";
import { checkValidationOfEmail } from "@/data/email/check-validation";

export const checkIdentityStatus = async (email: string) => {
  if (!isEmailValid(email)) {
    return false;
  }

  const validation = checkValidationOfEmail(email);
  if (!validation) {
    return false;
  }

  const res = await getAllIdentities();
  if (res.error) {
    return false;
  }

  const identities = res.identities as string[];
  for (const identity of identities) {
    if (identity === email || getDomainFromEmail(email) === identity) {
      return true;
    }
  }

  return false;
};

const isEmailValid = (email: string) => {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailPattern.test(email);
};

const getDomainFromEmail = (email: string) => {
  const parts = email.split("@");
  return parts[1];
};
