"use server";

import { prisma } from "@/lib/prisma";
import { Campaign } from "@/shared/types/campaign";

export const updateCampaign = async (campaign: Campaign) => {
  try {
    await prisma.campaigns.update({
      where: {
        campaignId: campaign.campaignId
      },
      data: {
        ...campaign
      }
    });

    return {
      success: true
    };
  } catch (error) {
    return {
      error: true
    };
  }
};

// import db from "@/lib/db";
// import { UpdateCommand } from "@aws-sdk/lib-dynamodb";

// const TableName = process.env.AWS_DYNAMODB_CAMPAIGNS_TABLE_NAME;

// export const updateCampaign = async (campaign: Campaign) => {
//   const command = new UpdateCommand({
//     TableName,
//     Key: { userEmail: campaign.userEmail, campaignId: campaign.campaignId },
//     UpdateExpression:
//       "SET title = :title, #to = :to, #from = :from, subject = :subject, #time = :time, #email = :email",
//     ExpressionAttributeNames: {
//       "#to": "to",
//       "#from": "from",
//       "#time": "time",
//       "#email": "email"
//     },
//     ExpressionAttributeValues: {
//       ":title": campaign.title,
//       ":to": campaign.to || null,
//       ":from": campaign.from || null,
//       ":subject": campaign.subject || null,
//       ":time": campaign.time || null,
//       ":email": campaign.email || null
//     },
//     ReturnValues: "ALL_NEW"
//   });

//   try {
//     const response = await db.send(command);
//     return response.Attributes;
//   } catch (error) {
//     console.error(error);
//     return null;
//   }
// };
