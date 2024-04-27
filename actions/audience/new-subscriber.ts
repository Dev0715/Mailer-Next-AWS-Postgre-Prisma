"use server";

import { createSubscriber } from "@/data/audience/subscriber-create";
import { getSubscriberByEmail } from "@/data/audience/subscriber-by-email";
import { updateSubscriber } from "@/data/audience/subscriber-update";
import { Subscriber } from "@/shared/types/subscriber";

export const newSubscriber = async (
  values: Subscriber,
  updateChecked: boolean
) => {
  const existingSubscriber = await getSubscriberByEmail({
    userEmail: values.userEmail,
    subscriberEmail: values.subscriberEmail
  });

  if (existingSubscriber && !updateChecked) {
    return {
      error: "Subscriber with same email already exists!"
    };
  }

  if (existingSubscriber) {
    const response = await updateSubscriber({
      ...values,
      lastChanged: new Date()
    });

    if (response.success) {
      return { success: "Subscriber was updated successfully!" };
    } else {
      return { error: "Internal Server Error" };
    }
  }

  const created = new Date();
  const lastChanged = created;

  const response = await createSubscriber({ ...values, created, lastChanged });

  if (response.success) {
    return { success: "New subscriber registered!" };
  } else {
    return { error: "Internal Server Error" };
  }
};
