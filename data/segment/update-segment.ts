"use server";

import db from "@/lib/dynamo";
import { Segment } from "@/shared/types/segment";
import { UpdateCommand } from "@aws-sdk/lib-dynamodb";

const TableName = process.env.AWS_DYNAMODB_SEGMENTS_TABLE_NAME;

export const updateSegment = async (segment: Segment) => {
  const command = new UpdateCommand({
    TableName,
    Key: { userEmail: segment.userEmail, segmentId: segment.segmentId },
    UpdateExpression:
      "SET title = :title, description = :description, filters = :filters",
    ExpressionAttributeValues: {
      ":title": segment.title,
      ":description": segment.description,
      ":filters": segment.filters
    },
    ReturnValues: "ALL_NEW"
  });

  try {
    await db.send(command);
    return {
      success: true
    };
  } catch (error) {
    return {
      error: true
    };
  }
};
