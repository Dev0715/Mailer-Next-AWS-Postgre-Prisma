"use server";

import { prisma } from "@/lib/prisma";

export const getNubmersOfSubscribersByCondition = async (condition: any) => {
  try {
    return await prisma.mailinglist.count(condition);
  } catch (error) {
    return null;
  }
};
