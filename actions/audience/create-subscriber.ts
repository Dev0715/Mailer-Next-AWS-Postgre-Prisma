"use server";

import * as z from "zod";
import { NewSubscriberSchema } from "@/schemas/contacts";

export const createNewSubscriber = async (
  values: z.infer<typeof NewSubscriberSchema>
) => {
  const validatedFields = NewSubscriberSchema.safeParse(values);
  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }

  return { success: "Password updated!" };
};
