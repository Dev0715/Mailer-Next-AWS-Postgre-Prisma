"use server";

import { prisma } from "@/lib/prisma";
import { Campaign } from "@/shared/types/campaign";

export const getCampaignById = async (campaignId: string) => {
  try {
    const campaign: Campaign = (await prisma.campaigns.findUnique({
      where: {
        campaignId
      }
    })) as unknown as Campaign;
    if (campaign?.time?.date) {
      campaign.time.date = new Date(campaign.time.date);
    }
    return campaign;
  } catch (error) {
    return null;
  }
};
