"use server";

import db from "@/lib/db";
import { PutCommand } from "@aws-sdk/lib-dynamodb";

const TableName = process.env.AWS_DYNAMODB_CAMPAIGNS_TABLE_NAME;

type Params = {
  userEmail: string;
  campaignId: string;
  title: string;
};

export const createCampaign = async (data: Params) => {
  const command = new PutCommand({
    TableName,
    Item: {
      ...data
    }
  });

  try {
    const response = await db.send(command);
    return { success: true, response };
  } catch (error) {
    return { error };
  }
};
