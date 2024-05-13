"use server";

import { prisma } from "@/lib/prisma";

export const deleteSubscribers = async (
  userEmail: string,
  subscriberEmails: string[]
) => {
  try {
    await prisma.mailinglist.deleteMany({
      where: {
        userEmail,
        subscriberEmail: {
          in: subscriberEmails
        }
      }
    });
    return { success: true };
  } catch (error) {
    return { error: true };
  }
};
