"use server";

import { prisma } from "@/lib/prisma";

type UpdateData = Record<string, string | Date | string[] | boolean | number>;

type Params = UpdateData & {
  id: string;
};

export const updateSubscriber = async (data: Params) => {
  const _data: UpdateData = {
    ...data,
    lastChanged: new Date()
  };

  if (_data.id) {
    delete _data.id;
  }

  try {
    await prisma.mailinglist.update({
      where: {
        id: data.id
      },
      data: {
        ..._data
      }
    });

    return { success: true };
  } catch (error) {
    return { error: true };
  }
};
