"use server";

import sesClient from "@/lib/ses";
import { ListIdentitiesCommand } from "@aws-sdk/client-ses";

export const getAllIdentities = async () => {
  try {
    const command = new ListIdentitiesCommand({});
    const response = await sesClient.send(command);

    return {
      success: true,
      identities: response.Identities
    };
  } catch (error) {
    return {
      error: true
    };
  }
};
