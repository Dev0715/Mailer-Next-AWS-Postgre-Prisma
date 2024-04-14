"use server";

import { createSubscriber } from "@/data/audience/create-subscriber";
import { NewSubscriber } from "@/shared/customer-type";

export const newSubscriber = async (values: NewSubscriber) => {
  const response = await createSubscriber(values);
  if (response) {
    return { success: "Password updated!" };
  } else {
    return { error: "Password updated!" };
  }
};
