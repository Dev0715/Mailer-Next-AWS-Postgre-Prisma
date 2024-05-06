"use server";

import { prisma } from "@/lib/prisma";

export const updateCampaignOpened = async (
  campaignId: string,
  openedEmails: string[]
) => {
  try {
    await prisma.campaigns.update({
      where: {
        campaignId
      },
      data: {
        openedEmails
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
