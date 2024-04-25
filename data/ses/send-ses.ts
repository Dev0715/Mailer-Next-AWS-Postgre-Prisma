"use server";

import sesClient from "@/lib/ses";
import { SendEmailCommand } from "@aws-sdk/client-ses";

export const sendSES = async (command: any) => {
  console.log(command);
  try {
    const Command = new SendEmailCommand(command);
    const res = await sesClient.send(Command);
    console.log(res);
    return res;
  } catch (error) {
    console.log(error);
    return error;
  }
};
