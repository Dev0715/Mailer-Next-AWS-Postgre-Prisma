import db from "@/lib/dynamo";
import { UpdateCommand } from "@aws-sdk/lib-dynamodb";

const TableName = process.env.AWS_DYNAMODB_USER_TABLE_NAME;

interface UserSetToken {
  email: string;
  verificationToken: string;
  expires: Date;
}

export const updateUserToken = async (data: UserSetToken) => {
  const command = new UpdateCommand({
    TableName,
    Key: { email: data.email },
    UpdateExpression:
      "SET verificationToken = :verificationToken, expires = :expires",
    ExpressionAttributeValues: {
      ":verificationToken": data.verificationToken,
      ":expires": data.expires.toISOString()
    },
    ReturnValues: "ALL_NEW"
  });

  try {
    await db.send(command);
    return {
      success: true
    };
  } catch (error) {
    return {
      error: true
    };
  }
};
