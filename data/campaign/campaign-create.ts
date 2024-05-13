"use server";

import { prisma } from "@/lib/prisma";
import { Campaign } from "@/shared/types/campaign";

export const createCampaign = async (data: Campaign) => {
  try {
    await prisma.campaigns.create({
      data: {
        ...data
      }
    });
    return { success: true };
  } catch (error) {
    return { error: true };
  }
};
