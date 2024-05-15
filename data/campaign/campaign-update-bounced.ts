"use server";

import { prisma } from "@/lib/prisma";

export const updateCampaignBounced = async (
  campaignId: string,
  bouncedEmails: string[],
  bouncedCount: number
) => {
  try {
    await prisma.campaigns.update({
      where: {
        campaignId
      },
      data: {
        bouncedEmails,
        bouncedCount
      }
    });

    return { success: true };
  } catch (error) {
    return { error: true };
  }
};
