// import db from "@/lib/db";
// import { GetCommand } from "@aws-sdk/lib-dynamodb";

import { prisma } from "@/lib/prisma";

// const TableName = process.env.AWS_DYNAMODB_MAILING_LIST_TABLE_NAME;

type Params = {
  userEmail: string;
  subscriberEmail: string;
};

// export const getSubscriberByEmail = async ({
//   userEmail,
//   subscriberEmail
// }: Params) => {
//   const command = new GetCommand({
//     TableName,
//     Key: { userEmail, subscriberEmail }
//   });

//   try {
//     const response = await db.send(command);
//     return response.Item;
//   } catch (error) {
//     return null;
//   }
// };

export const getSubscriberByEmail = async ({
  userEmail,
  subscriberEmail
}: Params) => {
  try {
    return await prisma.mailinglist.findFirst({
      where: {
        userEmail: userEmail,
        subscriberEmail: subscriberEmail
      }
    });
  } catch (error) {
    return null;
  }
};
