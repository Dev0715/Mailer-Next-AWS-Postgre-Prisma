"use server";

import { prisma } from "@/lib/prisma";
import { Subscriber } from "@/shared/types/subscriber";

export const createSubscriber = async (data: Subscriber) => {
  try {
    await prisma.mailinglist.create({
      data: {
        ...data
      }
    });
    return { success: true };
  } catch (error) {
    return { error: true };
  }
};
