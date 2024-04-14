import db from "@/lib/db";
import { GetCommand, PutCommand, UpdateCommand } from "@aws-sdk/lib-dynamodb";
import { generateVerificationToken } from "@/lib/tokens";

const TableName = process.env.AWS_DYNAMODB_USER_TABLE_NAME;
export const getUserByEmail = async (email: string) => {
  const command = new GetCommand({
    TableName,
    Key: { email }
  });

  try {
    const response = await db.send(command);
    console.log("__getUserByEmail__GetCommand__RESPONSE", response);
    return response.Item;
  } catch (error) {
    console.log("__getUserByEmail__GetCommand__ERROR", error);
    return null;
  }
};
