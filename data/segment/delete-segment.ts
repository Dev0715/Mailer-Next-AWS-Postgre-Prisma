"use server";

import dynamoDB from "@/lib/dynamo";
import { DeleteCommand } from "@aws-sdk/lib-dynamodb";

const TableName = process.env.AWS_DYNAMODB_SEGMENTS_TABLE_NAME;

export const deleteSegment = async (userEmail: string, segmentId: string) => {
  const command = new DeleteCommand({
    TableName,
    Key: { userEmail, segmentId }
  });

  try {
    await dynamoDB.send(command);
    return {
      success: true
    };
  } catch (error) {
    return {
      error: true
    };
  }
};
