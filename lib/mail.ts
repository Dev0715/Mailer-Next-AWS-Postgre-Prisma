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
