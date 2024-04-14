import db from "@/lib/db";
import { GetCommand, PutCommand, UpdateCommand } from "@aws-sdk/lib-dynamodb";
import { generateVerificationToken } from "@/lib/tokens";

const TableName = process.env.AWS_DYNAMODB_TABLE_NAME;

interface UserSetPassword {
  email: string;
  password: string;
  emailVerified: Date;
}

export const updateUserPassword = async (data: UserSetPassword) => {
  const command = new UpdateCommand({
    TableName,
    Key: { email: data.email },
    UpdateExpression:
      "SET password = :password, emailVerified = :emailVerified",
    ExpressionAttributeValues: {
      ":password": data.password,
      ":emailVerified": data.emailVerified.toISOString()
    },
    ReturnValues: "ALL_NEW"
  });

  try {
    const response = await db.send(command);
    console.log("__updateUserPassword__UpdateCommand__RESPONSE", response);
    return response.Attributes;
  } catch (error) {
    console.log("__updateUserPassword__UpdateCommand__ERROR", error);
    return null;
  }
};
