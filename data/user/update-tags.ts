"use server";

import dynamoDB from "@/lib/dynamo";
import { UpdateCommand } from "@aws-sdk/lib-dynamodb";

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
    await dynamoDB.send(command);
    return {
      success: true
    };
  } catch (error) {
    return {
      error: true
    };
  }
};
