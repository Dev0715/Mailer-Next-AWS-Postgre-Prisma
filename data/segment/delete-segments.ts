"use server";

import db from "@/lib/dynamo";
import { DeleteCommand } from "@aws-sdk/lib-dynamodb";

const TableName = process.env.AWS_DYNAMODB_SEGMENTS_TABLE_NAME;

export const deleteSegments = async (
  userEmail: string,
  segmentIds: string[]
) => {
  try {
    await Promise.all(
      segmentIds.map(async (segmentId) => {
        const command = new DeleteCommand({
          TableName,
          Key: { userEmail, segmentId }
        });
        await db.send(command);
      })
    );
    return {
      success: true
    };
  } catch (error) {
    return {
      error: true
    };
  }
};
