"use server";

import schedulerClient from "@/lib/scheduler";
import { CreateScheduleCommand } from "@aws-sdk/client-scheduler";

export const scheduleCampaign = async (
  campaignId: string,
  scheduledTime: string
) => {
  const command = new CreateScheduleCommand({
    Name: `campaign-${campaignId}`,
    ScheduleExpression: `at(${scheduledTime})`, //"at(2024-04-01T00:00:00)"
    ScheduleExpressionTimezone: "UTC",
    FlexibleTimeWindow: {
      Mode: "OFF"
    },
    Target: {
      Arn: process.env.AWS_LAMBDA_RUN_CAMPAIGN_FUNC_ARN,
      RoleArn: process.env.AWS_IAM_ROLE_OF_SCHEDULER_ARN,
      Input: JSON.stringify({ campaignId })
    },
    State: "ENABLED",
    ActionAfterCompletion: "DELETE"
  });

  try {
    await schedulerClient.send(command);
    return { success: true };
  } catch (error) {
    console.error(error);
    return { error: true };
  }
};
