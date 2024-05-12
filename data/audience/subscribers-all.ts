"use server";

import { prisma } from "@/lib/prisma";

export const getAllSubscribersByEmail = async (userEmail: string) => {
  try {
    return await prisma.mailinglist.findMany({
      where: {
        userEmail
      }
    });
  } catch (error) {
    return null;
  }
};
