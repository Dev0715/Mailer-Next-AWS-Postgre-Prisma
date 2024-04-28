"use server";

import { verifyEmail } from "@devmehq/email-validator-js";

export const checkValidationOfEmail = async () => {
  const response = await verifyEmail({
    emailAddress: "abc@gmail.com",
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
