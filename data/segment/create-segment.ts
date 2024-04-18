"use server";

import db from "@/lib/db";
import { Segment } from "@/shared/segment-type";
import { GetCommand, PutCommand, UpdateCommand } from "@aws-sdk/lib-dynamodb";

const TableName = process.env.AWS_DYNAMODB_SEGMENTS_TABLE_NAME;

export const createSegment = async (data: Segment) => {
  const command = new PutCommand({
    TableName,
    Item: {
      ...data
    }
  });

  try {
    const response = await db.send(command);
    console.log("__createSegment__PutCommand__RESPONSE", response);
    return { success: true, response };
  } catch (error) {
    console.log("__createSegment__PutCommand__ERROR", error);
    return { error };
  }
};
