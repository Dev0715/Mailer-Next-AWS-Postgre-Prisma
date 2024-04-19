"use server";

import { createSubscriber } from "@/data/audience/create-subscriber";
import { getSubscriberByEmail } from "@/data/audience/subscriber-by-email";
import { updateCustomer } from "@/data/audience/update-cusomer";
import { Customer } from "@/shared/customer-type";

export const newSubscriber = async (
  values: Customer,
  updateChecked: boolean
) => {
  const existingSubscriber = await getSubscriberByEmail({
    userEmail: values.userEmail,
    subscriberEmail: values.subscriberEmail
  });

  if (existingSubscriber && !updateChecked) {
    return { error: "Subscriber with same email already exists!" };
  }

  if (existingSubscriber) {
    const response = await updateCustomer({
      ...values,
      lastChanged: new Date().toISOString()
    });

    if (response.success) {
      return { success: "Subscriber was updated successfully!" };
    } else {
      return { error: response.error };
    }
  }

  const created = new Date().toISOString();
  const lastChanged = created;

  const response = await createSubscriber({ ...values, created, lastChanged });

  if (response.success) {
    return { success: "New subscriber registered!" };
  } else {
    return { error: response.error };
  }
};
