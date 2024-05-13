"use server";

import dynamoDB from "@/lib/dynamo";
import { GetCommand } from "@aws-sdk/lib-dynamodb";

const TableName = process.env.AWS_DYNAMODB_USER_TABLE_NAME;

export const getUserByEmail = async (email: string) => {
  const command = new GetCommand({
    TableName,
    Key: { email }
  });

  try {
    const response = await dynamoDB.send(command);
    return response.Item;
  } catch (error) {
    return null;
  }
};
