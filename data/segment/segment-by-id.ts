"use server";

import db from "@/lib/db";
import { GetCommand, PutCommand, UpdateCommand } from "@aws-sdk/lib-dynamodb";

const TableName = process.env.AWS_DYNAMODB_SEGMENTS_TABLE_NAME;

export const getSegmentById = async (userEmail: string, segmentId: string) => {
  const command = new GetCommand({
    TableName,
    Key: { userEmail, segmentId }
  });

  try {
    const response = await db.send(command);
    return response.Item;
  } catch (error) {
    return null;
  }
};
