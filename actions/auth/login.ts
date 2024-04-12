"use server";

import { z } from "zod";
import { AuthError } from "next-auth";

import { LoginSchema } from "@/schemas/auth";
import { getUserByEmail, updateUserToken } from "@/data/user/user";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { sendVerificationEmail } from "@/lib/mail";
import { signIn } from "@/auth";
import { generateVerificationToken } from "@/lib/tokens";

export const login = async (
  values: z.infer<typeof LoginSchema>,
  callbackUrl?: string | null
) => {
  const validateFields = LoginSchema.safeParse(values);
  if (!validateFields.success) {
    return { error: "Server Says Fields are Invalid!" };
  }

  const { email, password, code } = validateFields.data;
  const existingUser = await getUserByEmail(email);
  if (!existingUser || !existingUser.email) {
    return { error: "Email does not exist!" };
  }

  if (!existingUser.emailVerified) {
    const updatedUser = await updateUserToken({
      email,
      verificationToken: generateVerificationToken(email),
      expires: new Date(new Date().getTime() + 3600 * 1000)
    });

    const response = await sendVerificationEmail(
      updatedUser.email,
      updatedUser.verificationToken
    );

    if (response.error) {
      return { error: response.error.name };
    }

    return { success: "Confirmation email sent!" };
  }

  // if (existingUser.isTwoFactorEnabled && existingUser.email) { ...

  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: callbackUrl || DEFAULT_LOGIN_REDIRECT
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Invalid credentials!" };
        default:
          return { error: "Something went wrong!" };
      }
    }

    throw error;
  }

  return { success: "Data is Valid, Message Received!" };
};

// if (existingUser.isTwoFactorEnabled && existingUser.email) {
//   if (code) {
//     const twoFactorToken = await getTwoFactorTokenByEmail(existingUser.email);

//     if (!twoFactorToken) {
//       return { error: "Invalid code!" };
//     }

//     if (twoFactorToken.token !== code) {
//       return { error: "Invalid code!" };
//     }

//     const hasExpired = new Date(twoFactorToken.expires) < new Date();

//     if (hasExpired) {
//       return { error: "Code expired!" };
//     }

//     await db.twoFactorToken.delete({
//       where: { id: twoFactorToken.id }
//     });

//     const existingConfirmation = await getTwoFactorConfirmationByUserId(
//       existingUser.id
//     );

//     if (existingConfirmation) {
//       await db.twoFactorConfirmation.delete({
//         where: { id: existingConfirmation.id }
//       });
//     }

//     await db.twoFactorConfirmation.create({
//       data: {
//         userId: existingUser.id
//       }
//     });
//   } else {
//     const twoFactorToken = await generateTwoFactorToken(existingUser.email);
//     await sendTwoFactorTokenEmail(twoFactorToken.email, twoFactorToken.token);

//     return { twoFactor: true };
//   }
// }
