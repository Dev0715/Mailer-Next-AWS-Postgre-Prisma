"use server";

import { prisma } from "@/lib/prisma";

export const updateCampaignBounced = async (
  campaignId: string,
  bouncedEmails: string[],
  bouncedNumber: number
) => {
  try {
    await prisma.campaigns.update({
      where: {
        campaignId
      },
      data: {
        bouncedEmails,
        bouncedNumber
      }
    });

    return { success: true };
  } catch (error) {
    return { error: true };
  }
};
