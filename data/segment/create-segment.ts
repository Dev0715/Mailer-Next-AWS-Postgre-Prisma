"use server";

import dynamoDB from "@/lib/dynamo";
import { Segment } from "@/shared/types/segment";
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
