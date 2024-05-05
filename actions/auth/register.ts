"use server";

import { z } from "zod";
import { hash } from "bcryptjs";

import { RegisterSchema } from "@/schemas/auth";
import { getUserByEmail } from "@/data/user/user-by-email";
import { createUser } from "@/data/user/create-user";
import { sendVerificationEmail } from "../mail/send-verification";

export const register = async (values: z.infer<typeof RegisterSchema>) => {
  const validateFields = RegisterSchema.safeParse(values);
  if (!validateFields.success) {
    return { error: "Server Says Fields are Invalid!" };
  }

  const { email, password, name } = validateFields.data;
  const hashedPassword = await hash(password, 10);
  const existingUser = await getUserByEmail(email);

  if (existingUser) {
    return { error: "Email already in use!" };
  }

  const verificationToken = await createUser({
    name,
    email,
    password: hashedPassword
  });

  if (verificationToken) {
    await sendVerificationEmail(email, verificationToken);
    return {
      success: "New user registered, Check your mailbox!"
    };
  } else {
    return {
      error: "Server Error!"
    };
  }
};
