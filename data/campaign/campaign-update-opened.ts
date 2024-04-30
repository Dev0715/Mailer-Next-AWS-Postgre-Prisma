"use server";

import { prisma } from "@/lib/prisma";
import { Campaign } from "@/shared/types/campaign";

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

    return { success: true };
  } catch (error) {
    return null;
  }
};
