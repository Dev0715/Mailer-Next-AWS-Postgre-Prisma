"use server";

import db from "@/lib/dynamo";
import { GetCommand, PutCommand, UpdateCommand } from "@aws-sdk/lib-dynamodb";
import { generateVerificationToken } from "@/lib/tokens";

const TableName = process.env.AWS_DYNAMODB_USER_TABLE_NAME;

interface UserSetToken {
  email: string;
  tags: string[];
}

export const updateUserTags = async (data: UserSetToken) => {
  const command = new UpdateCommand({
    TableName,
    Key: { email: data.email },
    UpdateExpression: "SET tags = :tags",
    ExpressionAttributeValues: {
      ":tags": data.tags
    },
    ReturnValues: "ALL_NEW"
  });

  try {
    const response = await db.send(command);
    console.log("__updateUserTags__UpdateCommand__RESPONSE", response);
    return response.Attributes;
  } catch (error) {
    console.log("__updateUserTags__UpdateCommand__ERROR", error);
    return null;
  }
};
