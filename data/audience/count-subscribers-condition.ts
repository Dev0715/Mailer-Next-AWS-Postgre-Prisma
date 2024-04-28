"use server";

import { prisma } from "@/lib/prisma";

export const getNubmersOfSubscribersByCondition = async (condition: any) => {
  try {
    return await prisma.mailinglist.count(condition);
  } catch (error) {
    console.log("Error", error);
    return null;
  }
};
