"use server";

// import db from "@/lib/db";
import { prisma } from "@/lib/prisma";
// import { GetCommand } from "@aws-sdk/lib-dynamodb";

// const TableName = process.env.AWS_DYNAMODB_CAMPAIGNS_TABLE_NAME;

// export const getCampaignById = async (
//   userEmail: string,
//   campaignId: string
// ) => {
//   const command = new GetCommand({
//     TableName,
//     Key: { userEmail, campaignId }
//   });

//   try {
//     const response = await db.send(command);
//     return response.Item;
//   } catch (error) {
//     return null;
//   }
// };

export const getCampaignById = async (
  userEmail: string,
  campaignId: string
) => {
  try {
    return await prisma.campaigns.findFirst({
      where: {
        userEmail: userEmail,
        campaignId: campaignId
      }
    });
  } catch (error) {
    return null;
  }
};
