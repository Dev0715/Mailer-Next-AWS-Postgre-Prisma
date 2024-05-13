"use server";

import { prisma } from "@/lib/prisma";
import { Campaign } from "@/shared/types/campaign";

export const updateCampaign = async (campaign: Campaign) => {
  try {
    await prisma.campaigns.update({
      where: {
        campaignId: campaign.campaignId
      },
      data: {
        ...campaign
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
