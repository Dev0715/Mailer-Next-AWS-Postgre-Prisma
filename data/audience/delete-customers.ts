"use server";

import db from "@/lib/db";
import { DeleteCommand } from "@aws-sdk/lib-dynamodb";

const TableName = process.env.AWS_DYNAMODB_MAILING_LIST_TABLE_NAME;

export const deleteCutomers = async (
  ownerEmail: string,
  customerEmails: string[]
) => {
  try {
    const response = await Promise.all(
      customerEmails.map(async (customerEmail) => {
        const command = new DeleteCommand({
          TableName,
          Key: { ownerEmail, customerEmail }
        });
        await db.send(command);
      })
    );
    console.log("__deleteCustomers__", response);
    return { success: true };
  } catch (error) {
    return { success: false };
  }
};
