"use server";

import sesClient from "@/lib/ses";
import { SendEmailCommand } from "@aws-sdk/client-ses";

type Params = {
  from: string;
  to: string[];
  subject: string;
  html: string;
};

export const sendEmail = async (email: Params) => {
  try {
    const command = new SendEmailCommand({
      Source: email.from,
      Destination: {
        ToAddresses: email.to
      },
      Message: {
        Subject: {
          Data: email.subject
        },
        Body: {
          Html: {
            Data: email.html
          }
        }
      }
    });

    await sesClient.send(command);
    return {
      success: true
    };
  } catch (error) {
    return {
      error: true
    };
  }
};
