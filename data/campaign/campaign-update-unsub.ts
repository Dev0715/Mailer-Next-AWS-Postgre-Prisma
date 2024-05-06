"use server";

import { prisma } from "@/lib/prisma";

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

    return {
      success: true
    };
  } catch (error) {
    return {
      error: true
    };
  }
};
