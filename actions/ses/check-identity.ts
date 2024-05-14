"use server";

import { getAllIdentities } from "@/data/email/all-identities";

export const checkIdentity = async (email: string) => {
  const res = await getAllIdentities();
  if (res.error) {
    return { error: "Failed to get identities" };
  }

  const identities = res.identities;
  console.log(identities);
};
