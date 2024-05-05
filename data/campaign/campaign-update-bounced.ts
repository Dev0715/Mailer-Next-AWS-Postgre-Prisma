"use server";

import { prisma } from "@/lib/prisma";
import { Campaign } from "@/shared/types/campaign";

export const updateCampaignBounced = async (
  campaignId: string,
  bouncedEmails: string[]
) => {
  try {
    await prisma.campaigns.update({
      where: {
        campaignId
      },
      data: {
        bouncedEmails
      }
    });

    return { success: true };
  } catch (error) {
    return null;
  }
};
