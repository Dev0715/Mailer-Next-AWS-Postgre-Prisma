import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const domain = process.env.NEXT_PUBLIC_APP_URL;
const fromEmail = "onboarding@resend.dev";
// const fromEmail = "mail@auth-masterclass-tutorial.com";

export const sendVerificationEmail = async (email: string, token: string) => {
  const confirmLink = `${domain}/auth/new-verification?token=${token}`;

  const response = await resend.emails.send({
    from: fromEmail,
    to: email,
    subject: "Confirm your email",
    html: `<p>Click <a href="${confirmLink}">here</a> to confirm email.</p>`
  });

  console.log("__sendVerificationEmail__RESPONSE", response);
  return response;
};

export const sendPasswordResetEmail = async (email: string, token: string) => {
  const resetLink = `${domain}/auth/new-password?token=${token}`;

  const response = await resend.emails.send({
    from: fromEmail,
    to: email,
    subject: "Reset your password",
    html: `<p>Click <a href="${resetLink}">here</a> to reset password.</p>`
  });

  console.log("__sendPasswordResetEmail__RESPONSE", response);
  return response;
};

export const sendTwoFactorTokenEmail = async (email: string, token: string) => {
  const response = await resend.emails.send({
    from: fromEmail,
    to: email,
    subject: "2FA Code",
    html: `<p>Your 2FA code: ${token}</p>`
  });

  console.log("__sendTwoFactorTokenEmail__RESPONSE", response);
  return response;
};
