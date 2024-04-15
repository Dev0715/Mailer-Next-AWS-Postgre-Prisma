import db from "@/lib/db";
import { GetCommand } from "@aws-sdk/lib-dynamodb";

const TableName = process.env.AWS_DYNAMODB_USER_TABLE_NAME;

export const getTagsByEmail = async (email: string) => {
  const command = new GetCommand({
    TableName,
    Key: { email }
  });

  try {
    const response = await db.send(command);
    console.log("__getTagsByEmail__GetCommand__RESPONSE", response);
    return response.Item;
  } catch (error) {
    console.log("__getTagsByEmail__GetCommand__ERROR", error);
    return null;
  }
};
