"use server";

import db from "@/lib/db";
import { DeleteCommand } from "@aws-sdk/lib-dynamodb";

const TableName = process.env.AWS_DYNAMODB_MAILING_LIST_TABLE_NAME;

export const deleteCutomer = async (
  ownerEmail: string,
  customerEmail: string
) => {
  const command = new DeleteCommand({
    TableName,
    Key: { ownerEmail, customerEmail }
  });

  try {
    const response = await db.send(command);
    console.log("__deleteCutomer__DeleteCommand__RESPONSE", response);
    return { success: true, response };
  } catch (error) {
    console.log("__deleteCutomer__DeleteCommand__ERROR", error);
    return { error };
  }
};
