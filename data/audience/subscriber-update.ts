"use server";

import { prisma } from "@/lib/prisma";
// import db from "@/lib/db";
// import { UpdateCommand } from "@aws-sdk/lib-dynamodb";
import { Subscriber } from "@/shared/types/subscriber";

// const TableName = process.env.AWS_DYNAMODB_MAILING_LIST_TABLE_NAME;

// export const updateSubscriber = async (data: Subscriber) => {
//   const command = new UpdateCommand({
//     TableName,
//     Key: { userEmail: data.userEmail, subscriberEmail: data.subscriberEmail },
//     UpdateExpression:
//       "SET firstName = :firstName, lastName = :lastName, address = :address, phoneNumber = :phoneNumber, birthday = :birthday, tags = :tags, subscribed = :subscribed, lastChanged = :lastChanged",
//     ExpressionAttributeValues: {
//       ":firstName": data.firstName,
//       ":lastName": data.lastName,
//       ":address": data.address,
//       ":phoneNumber": data.phoneNumber,
//       ":birthday": data.birthday,
//       ":tags": data.tags,
//       ":subscribed": data.subscribed,
//       ":lastChanged": data.lastChanged
//     },
//     ReturnValues: "ALL_NEW"
//   });

//   try {
//     await db.send(command);
//     return { success: true };
//   } catch (error) {
//     return { error };
//   }
// };

export const updateSubscriber = async (data: Subscriber) => {
  try {
    await prisma.mailinglist.updateMany({
      where: {
        userEmail: data.userEmail,
        subscriberEmail: data.subscriberEmail
      },
      data: {
        firstName: data.firstName,
        lastName: data.lastName,
        address: data.address,
        phoneNumber: data.phoneNumber,
        birthday: data.birthday,
        tags: data.tags,
        subscribed: data.subscribed,
        lastChanged: data.lastChanged
      }
    });

    return { success: true };
  } catch (error) {
    return { error: true };
  }
};
