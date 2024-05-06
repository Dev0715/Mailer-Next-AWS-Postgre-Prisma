"use server";

import db from "@/lib/dynamo";
import { QueryCommand } from "@aws-sdk/lib-dynamodb";

const TableName = process.env.AWS_DYNAMODB_SEGMENTS_TABLE_NAME;

export const getAllSegmentsByEmail = async (userEmail: string) => {
  const command = new QueryCommand({
    TableName,
    KeyConditionExpression: "userEmail = :userEmail",
    ExpressionAttributeValues: {
      ":userEmail": userEmail
    }
  });

  try {
    const response = await db.send(command);
    return {
      items: response.Items
    };
  } catch (error) {
    return {
      items: []
    };
  }
};
