import db from "@/lib/db";
import { GetCommand, PutCommand, UpdateCommand } from "@aws-sdk/lib-dynamodb";
import { generateVerificationToken } from "@/lib/tokens";
import { NewSubscriber } from "@/shared/customer-type";

const TableName = process.env.AWS_DYNAMODB_MAILING_LIST_TABLE_NAME;

export const createSubscriber = async (data: NewSubscriber) => {
  const command = new PutCommand({
    TableName,
    Item: {
      ...data
    }
  });

  try {
    const response = await db.send(command);
    console.log("__createSubscriber__PutCommand__RESPONSE", response);
    return response;
  } catch (error) {
    console.log("__createSubscriber__PutCommand__ERROR", error);
    return null;
  }
};
