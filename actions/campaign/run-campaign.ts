import { InvokeCommand } from "@aws-sdk/client-lambda";

export const runCampaign = () => {
  const command = new InvokeCommand({
    FunctionName: "runCampaign",
    InvocationType: "Event",
    Payload: JSON.stringify({ campaignId: "" })
  });
};
