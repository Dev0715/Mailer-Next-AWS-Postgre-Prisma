"use server";

import { prisma } from "@/lib/prisma";
import { getFirstDateOfMonthsAgo } from "@/shared/functions/get-date-months-ago";

export const getAllCampaignsForStatistics = async (userEmail: string) => {
  try {
    const firstDate5MonthsAgo = getFirstDateOfMonthsAgo(5);
    return await prisma.campaigns.findMany({
      where: {
        AND: [
          { userEmail },
          {
            lastUpdated: {
              gte: firstDate5MonthsAgo
            }
          },
          {
            OR: [{ state: "sending" }, { state: "sent" }]
          }
        ]
      },
      select: {
        to: true,
        openedNumber: true,
        unsubedNumber: true,
        bouncedCount: true,
        lastUpdated: true
      }
    });
  } catch (error) {
    console.error(error);
    return null;
  }
};
