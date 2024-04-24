"use server";

import db from "@/lib/db";
import { PutCommand } from "@aws-sdk/lib-dynamodb";
import { Customer } from "@/shared/customer-type";

const TableName = process.env.AWS_DYNAMODB_MAILING_LIST_TABLE_NAME;

export const createSubscriber = async (data: Customer) => {
  const command = new PutCommand({
    TableName,
    Item: {
      ...data
    }
  });

  try {
    const response = await db.send(command);
    return { success: true, response };
  } catch (error) {
    return { error };
  }
};
