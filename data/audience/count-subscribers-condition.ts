"use server";

import { prisma } from "@/lib/prisma";

export const getNumbersOfSubscribersByCondition = async (condition?: any) => {
  try {
    return await prisma.mailinglist.count(condition);
  } catch (error) {
    console.error(error);
    return null;
  }
};
