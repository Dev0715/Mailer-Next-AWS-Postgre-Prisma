"use server";

import * as z from "zod";
import { NewSubscriberSchema } from "@/schemas/contacts";
import { createSubscriber } from "@/data/audience/create-subscriber";
import { NewSubscriber } from "@/shared/customer-type";

export const newSubscriber = async (values: NewSubscriber) => {
  const validatedFields = NewSubscriberSchema.safeParse(values);
  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }

  await createSubscriber({});

  return { success: "Password updated!" };
};
