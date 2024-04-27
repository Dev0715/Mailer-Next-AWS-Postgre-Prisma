"use server";

import db from "@/lib/db";
import { Segment } from "@/shared/types/segment-type";
import { PutCommand } from "@aws-sdk/lib-dynamodb";

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
    return { success: true, response };
  } catch (error) {
    return { error };
  }
};
