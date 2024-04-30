"use server";

import { prisma } from "@/lib/prisma";
import { Campaign } from "@/shared/types/campaign";

export const updateCampaignUnsub = async (
  campaignId: string,
  unsubEmails: string[]
) => {
  try {
    await prisma.campaigns.update({
      where: {
        campaignId
      },
      data: {
        unsubEmails
      }
    });

    return { success: true };
  } catch (error) {
    return null;
  }
};
