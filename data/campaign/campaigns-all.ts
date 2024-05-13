"use server";

import { prisma } from "@/lib/prisma";

export const getAllCampaignsByEmail = async (userEmail: string) => {
  try {
    return await prisma.campaigns.findMany({
      where: {
        userEmail
      },
      orderBy: {
        lastUpdated: "desc"
      }
    });
  } catch (error) {
    console.error(error);
    return null;
  }
};
