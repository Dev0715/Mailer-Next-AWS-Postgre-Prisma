"use server";

// import db from "@/lib/db";
import { prisma } from "@/lib/prisma";
import { Campaign } from "@/shared/types/campaign";
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

export const getCampaignById = async (campaignId: string) => {
  try {
    const campaign: Campaign = (await prisma.campaigns.findUnique({
      where: {
        campaignId
      }
    })) as unknown as Campaign;
    if (campaign?.time?.date) {
      campaign.time.date = new Date(campaign.time.date);
    }
    return campaign;
  } catch (error) {
    return null;
  }
};
