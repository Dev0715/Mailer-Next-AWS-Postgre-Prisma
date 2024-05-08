"use server";

import { prisma } from "@/lib/prisma";

type UpdateData = Record<string, string | Date | string[] | boolean | number>;

type Params = UpdateData & {
  id: string;
};

export const updateSubscriber = async (data: Params) => {
  const _data: UpdateData = {
    ...data,
    lastChanged: new Date()
  };

  if (_data.id) {
    delete _data.id;
  }

  try {
    await prisma.mailinglist.updateMany({
      where: {
        id: data.id
      },
      data: {
        ..._data
      }
    });

    return { success: true };
  } catch (error) {
    return { error: true };
  }
};

// import db from "@/lib/db";
// import { UpdateCommand } from "@aws-sdk/lib-dynamodb";

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
