"use server";

import { prisma } from "@/lib/prisma";

export const deleteCampaign = async (campaignId: string) => {
  try {
    await prisma.campaigns.delete({
      where: {
        campaignId
      }
    });
    return { success: true };
  } catch (error) {
    return { error: true };
  }
};

// import db from "@/lib/db";
// import { DeleteCommand } from "@aws-sdk/lib-dynamodb";

// const TableName = process.env.AWS_DYNAMODB_CAMPAIGNS_TABLE_NAME;

// export const deleteCampaign = async (userEmail: string, campaignId: string) => {
//   const command = new DeleteCommand({
//     TableName,
//     Key: { userEmail, campaignId }
//   });

//   try {
//     const response = await db.send(command);
//     return { success: true, response };
//   } catch (error) {
//     return { error };
//   }
// };
