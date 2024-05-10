"use server";

import { prisma } from "@/lib/prisma";
import { Subscriber } from "@/shared/types/subscriber";

export const createSubscriber = async (data: Subscriber) => {
  try {
    await prisma.mailinglist.create({
      data: {
        ...data
      }
    });
    return { success: true };
  } catch (error) {
    return { error: true };
  }
};

// import db from "@/lib/db";
// import { PutCommand } from "@aws-sdk/lib-dynamodb";

// const TableName = process.env.AWS_DYNAMODB_MAILING_LIST_TABLE_NAME;

// export const createSubscriber = async (data: Subscriber) => {
//   const command = new PutCommand({
//     TableName,
//     Item: {
//       ...data
//     }
//   });

//   try {
//     const response = await db.send(command);
//     return { success: true, response };
//   } catch (error) {
//     return { error };
//   }
// };
