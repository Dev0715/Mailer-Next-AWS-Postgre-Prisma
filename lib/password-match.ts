"use server";

import bcrypt from "bcrypt";

export const passwordsMatch = async (password: string, hash: string) => {
  const _match = await bcrypt.compare(password, hash);
  return _match;
};
