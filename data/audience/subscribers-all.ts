"use server";

import { prisma } from "@/lib/prisma";

export const getAllSubscribersByEmail = async (userEmail: string) => {
  try {
    return await prisma.mailinglist.findMany({
      where: {
        userEmail
      }
    });
  } catch (error) {
    return null;
  }
};

// import db from "@/lib/db";
// import { QueryCommand } from "@aws-sdk/lib-dynamodb";

// const TableName = process.env.AWS_DYNAMODB_MAILING_LIST_TABLE_NAME;

// export const getAllSubscribersByEmail = async (userEmail: string) => {
//   const command = new QueryCommand({
//     TableName,
//     KeyConditionExpression: "userEmail = :userEmail",
//     ExpressionAttributeValues: {
//       ":userEmail": userEmail
//     }
//   });

//   try {
//     const response = await db.send(command);
//     return response.Items;
//   } catch (error) {
//     return null;
//   }
// };
