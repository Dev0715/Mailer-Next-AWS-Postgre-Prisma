import db from "@/lib/db";
import { GetCommand, PutCommand, UpdateCommand } from "@aws-sdk/lib-dynamodb";
import { generateVerificationToken } from "@/lib/tokens";

const TableName = process.env.AWS_DYNAMODB_MAILING_LIST_TABLE_NAME;

export const getSubscriberByEmail = async ({
  userEmail,
  subscriberEmail
}: {
  userEmail: string;
  subscriberEmail: string;
}) => {
  const command = new GetCommand({
    TableName,
    Key: { userEmail, subscriberEmail }
  });

  try {
    const response = await db.send(command);
    console.log("__getSubscriberByEmail__GetCommand__RESPONSE", response);
    return response.Item;
  } catch (error) {
    console.log("__getSubscriberByEmail__GetCommand__ERROR", error);
    return null;
  }
};
