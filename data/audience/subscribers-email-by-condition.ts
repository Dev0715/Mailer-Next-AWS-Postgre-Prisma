"use server";

import { prisma } from "@/lib/prisma";

export const getAllSubscriberEmailsByCondition = async (condition: any) => {
  try {
    return await prisma.mailinglist.findMany({
      ...condition,
      select: {
        subscriberEmail: true
      }
    });
  } catch (error) {
    return null;
  }
};
