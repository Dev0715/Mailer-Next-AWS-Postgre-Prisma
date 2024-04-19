"use server";

import db from "@/lib/db";
import { QueryCommand } from "@aws-sdk/lib-dynamodb";

const TableName = process.env.AWS_DYNAMODB_MAILING_LIST_TABLE_NAME;

export const getAllCustomersByEmail = async (userEmail: string) => {
  const command = new QueryCommand({
    TableName,
    KeyConditionExpression: "userEmail = :userEmail",
    ExpressionAttributeValues: {
      ":userEmail": userEmail
    }
  });

  try {
    const response = await db.send(command);
    console.log("__getAllCustomersByEmail__GetCommand__RESPONSE", response);
    return response.Items;
  } catch (error) {
    console.log("__getAllCustomersByEmail__GetCommand__ERROR", error);
    return null;
  }
};
