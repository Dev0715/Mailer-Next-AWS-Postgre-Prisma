"use server";

import { verifyEmail } from "@devmehq/email-validator-js";

export const checkValidationOfEmail = async (email: string) => {
  const response = await verifyEmail({
    emailAddress: email,
    verifyMx: true,
    verifySmtp: true,
    timeout: 3000
  });

  return (
    response.validFormat &&
    response.validMx &&
    (response.validSmtp || response.validSmtp === null)
  );
};
