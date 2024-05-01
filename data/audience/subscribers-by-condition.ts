"use server";

import { prisma } from "@/lib/prisma";

export const getAllSubscribersByCondition = async (condition: any) => {
  try {
    return await prisma.mailinglist.findMany({
      ...condition,
      select: {
        userEmail: true
      }
    });
  } catch (error) {
    return null;
  }
};
