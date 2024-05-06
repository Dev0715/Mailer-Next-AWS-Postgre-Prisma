"use server";

import { prisma } from "@/lib/prisma";
import { CampaignState } from "@/shared/types/campaign";

export const updateCampaignState = async (
  campaignId: string,
  state: CampaignState
) => {
  try {
    await prisma.campaigns.update({
      where: {
        campaignId
      },
      data: {
        state
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
