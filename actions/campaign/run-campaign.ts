"use server";

import lambdaClient from "@/lib/lambda";
import { InvokeCommand } from "@aws-sdk/client-lambda";

export const runCampaign = async (campaignId: string) => {
  const command = new InvokeCommand({
    FunctionName: "runCampaign",
    InvocationType: "Event",
    Payload: JSON.stringify({ campaignId })
  });

  try {
    await lambdaClient.send(command);
    return { success: true };
  } catch (error) {
    return { error };
  }
};
