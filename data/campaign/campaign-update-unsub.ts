"use server";

import { prisma } from "@/lib/prisma";

export const updateCampaignUnsub = async (
  campaignId: string,
  unsubEmails: string[],
  unsubscribedCount: number
) => {
  try {
    await prisma.campaigns.update({
      where: {
        campaignId
      },
      data: {
        unsubEmails,
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
