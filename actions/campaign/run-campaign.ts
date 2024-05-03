import lambdaClient from "@/lib/lambda";
import { InvokeCommand } from "@aws-sdk/client-lambda";

export const runCampaign = async (campaignId: string) => {
  const command = new InvokeCommand({
    FunctionName: "runCampaign",
    InvocationType: "Event",
    Payload: JSON.stringify({ campaignId })
  });

  try {
    const res = await lambdaClient.send(command);
    console.log(res);
  } catch (error) {
    console.error(error);
  }
};
