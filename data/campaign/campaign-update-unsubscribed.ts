"use server";

import { prisma } from "@/lib/prisma";

export const updateCampaignUnsubscribed = async (
  campaignId: string,
  unsubscribedEmails: string[],
  unsubscribedCount: number
) => {
  try {
    await prisma.campaigns.update({
      where: {
        campaignId
      },
      data: {
        unsubscribedEmails,
        unsubscribedCount
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
