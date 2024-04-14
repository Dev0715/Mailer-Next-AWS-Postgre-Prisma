import db from "@/lib/db";
import { GetCommand, PutCommand, UpdateCommand } from "@aws-sdk/lib-dynamodb";
import { generateVerificationToken } from "@/lib/tokens";

const TableName = process.env.AWS_DYNAMODB_MAILING_LIST_TABLE_NAME;

interface NewUser {
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

export const createSubscriber = async (data: NewUser) => {
  if (data.emailVerified && data.emailVerified instanceof Date) {
    data.emailVerified = data.emailVerified.toISOString();
  }

  const verificationToken = generateVerificationToken(data.email);

  const command = new PutCommand({
    TableName,
    Item: {
      verificationToken,
      expires: new Date(new Date().getTime() + 3600 * 1000).toISOString(),
      ...data
    }
  });

  try {
    const response = await db.send(command);
    console.log("__createUser__PutCommand__RESPONSE", response);
    return verificationToken;
  } catch (error) {
    console.log("__createUser__PutCommand__ERROR", error);
    return null;
  }
};
