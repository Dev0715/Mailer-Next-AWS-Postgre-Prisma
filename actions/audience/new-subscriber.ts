"use server";

import { createSubscriber } from "@/data/audience/create-subscriber";
import { NewSubscriber } from "@/shared/customer-type";

export const newSubscriber = async (values: NewSubscriber) => {
  const response = await createSubscriber(values);
  if (response.success) {
    return { success: "New subscriber registered!" };
  } else {
    return { error: response.error };
  }
};
