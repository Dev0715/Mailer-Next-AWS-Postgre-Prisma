"use server";

import { prisma } from "@/lib/prisma";

export const deleteCampaign = async (campaignId: string) => {
  try {
    await prisma.campaigns.delete({
      where: {
        campaignId
      }
    });
    return { success: true };
  } catch (error) {
    return { error: true };
  }
};
