"use server";

import { prisma } from "@/lib/prisma";

export const deleteSubscribers = async (
  userEmail: string,
  subscriberEmails: string[]
) => {
  try {
    await prisma.mailinglist.deleteMany({
      where: {
        userEmail,
        subscriberEmail: {
          in: subscriberEmails
        }
      }
    });
    return { success: true };
  } catch (error) {
    return { error: true };
  }
};

// import db from "@/lib/db";
// import { DeleteCommand } from "@aws-sdk/lib-dynamodb";

// const TableName = process.env.AWS_DYNAMODB_MAILING_LIST_TABLE_NAME;

// export const deleteSubscribers = async (
//   userEmail: string,
//   subscriberEmails: string[]
// ) => {
//   try {
//     const response = await Promise.all(
//       subscriberEmails.map(async (subscriberEmail) => {
//         const command = new DeleteCommand({
//           TableName,
//           Key: { userEmail, subscriberEmail }
//         });
//         await db.send(command);
//       })
//     );
//     return { success: true };
//   } catch (error) {
//     return { error: true };
//   }
// };
