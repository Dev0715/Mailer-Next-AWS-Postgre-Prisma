"use server";

import db from "@/lib/db";
import { prisma } from "@/lib/prisma";
import { Segment } from "@/shared/segment-type";
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

export const createSegmentHandler = async (data: Segment) => {
  const response = await prisma.results.create({
    ...data,
    tags: {}
  });
  console.log(response);
};
