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
    console.log("__getAllSegmentsByEmail__GetCommand__RESPONSE", response);
    return response.Items;
  } catch (error) {
    console.log("__getAllSegmentsByEmail__GetCommand__ERROR", error);
    return null;
  }
};
