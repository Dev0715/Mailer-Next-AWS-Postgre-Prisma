"use server";

import { z } from "zod";
import bcrypt from "bcryptjs";

import { RegisterSchema } from "@/schemas/auth";
import { createUser, getUserByEmail } from "@/data/user";
import { sendVerificationEmail } from "@/lib/mail";
// import { generateVerificationToken } from "@/lib/tokens";

export const register = async (values: z.infer<typeof RegisterSchema>) => {
  const validateFields = RegisterSchema.safeParse(values);
  if (!validateFields.success) {
    return { error: "Server Says Fields are Invalid!" };
  }

  const { email, password, name } = validateFields.data;
  const hashedPassword = await bcrypt.hash(password, 10);
  const existingUser = await getUserByEmail(email);

  if (existingUser) {
    return { error: "Email already in use!" };
  }

  const verificationToken = await createUser({
    name,
    email,
    password: hashedPassword
  });

  // const verificationToken = await generateVerificationToken(email);

  if (verificationToken) {
    const response = await sendVerificationEmail(email, verificationToken);
    return { success: "New user registered, Check your mailbox!" };
  } else return { error: "Server Error!" };
};
