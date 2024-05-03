"use server";

import db from "@/lib/dynamo";
import { DeleteCommand } from "@aws-sdk/lib-dynamodb";

const TableName = process.env.AWS_DYNAMODB_SEGMENTS_TABLE_NAME;

export const deleteSegment = async (userEmail: string, segmentId: string) => {
  const command = new DeleteCommand({
    TableName,
    Key: { userEmail, segmentId }
  });

  try {
    const response = await db.send(command);
    console.log("__deleteSegment__DeleteCommand__RESPONSE", response);
    return { success: true, response };
  } catch (error) {
    console.log("__deleteSegment__DeleteCommand__ERROR", error);
    return { error };
  }
};
