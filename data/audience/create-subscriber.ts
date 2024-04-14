import db from "@/lib/db";
import { GetCommand, PutCommand, UpdateCommand } from "@aws-sdk/lib-dynamodb";
import { generateVerificationToken } from "@/lib/tokens";

const TableName = process.env.AWS_DYNAMODB_MAILING_LIST_TABLE_NAME;

interface NewSubscriber {
  ownerEmail: string;
  customerEmail: string;
  firstName: string;
  lastName: string;
  address: string;
  phone: string;
  birthday: string;
  tags: string[];
  subscribed: boolean;
  contactRating: number;
  created: string;
  lastChanged: string;
}

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
  } catch (error) {
    console.log("__createSubscriber__PutCommand__ERROR", error);
    return null;
  }
};
