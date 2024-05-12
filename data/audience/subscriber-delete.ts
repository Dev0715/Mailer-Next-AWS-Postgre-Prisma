"use server";

import { prisma } from "@/lib/prisma";

export const deleteSubscriber = async (id: string) => {
  try {
    await prisma.mailinglist.delete({
      where: {
        id
      }
    });
    return { success: true };
  } catch (error) {
    return { error: true };
  }
};
