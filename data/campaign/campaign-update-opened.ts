"use server";

import { prisma } from "@/lib/prisma";

export const updateCampaignOpened = async (
  campaignId: string,
  openedEmails: string[],
  openedNumber: number
) => {
  try {
    await prisma.campaigns.update({
      where: {
        campaignId
      },
      data: {
        openedEmails,
        openedNumber
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
