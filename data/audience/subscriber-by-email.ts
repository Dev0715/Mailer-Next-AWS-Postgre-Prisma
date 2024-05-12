"use server";

import { prisma } from "@/lib/prisma";

type Params = {
  userEmail: string;
  subscriberEmail: string;
};

export const getSubscriberByEmail = async ({
  userEmail,
  subscriberEmail
}: Params) => {
  try {
    return await prisma.mailinglist.findFirst({
      where: {
        userEmail: userEmail,
        subscriberEmail: subscriberEmail
      }
    });
  } catch (error) {
    return null;
  }
};
