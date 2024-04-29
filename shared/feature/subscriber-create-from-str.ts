import { createSubscriber } from "@/data/audience/subscriber-create";
import { Subscriber } from "../types/subscriber";
import { getSubscriberByEmail } from "@/data/audience/subscriber-by-email";

type FunctionType = (
  userEmail: string,
  str: string,
  splitter: string
) => Promise<number>;

export const createSubscriberFromStr: FunctionType = async (
  userEmail,
  str,
  splitter
) => {
  const fields = str.split(splitter);
  if (fields.length < 6) {
    return 0;
  }

  const subscriberEmail = fields[0].trim();
  const existingSubscriber = await getSubscriberByEmail({
    userEmail,
    subscriberEmail
  });

  if (existingSubscriber) {
    return 0;
  }

  const contact: Subscriber = {
    userEmail,
    subscriberEmail: fields[0].trim(),
    firstName: fields[1].trim(),
    lastName: fields[2].trim(),
    address: fields[3],
    phoneNumber: fields[4],
    birthday: new Date(fields[5]),
    tags: [],
    subscribed: true,
    contactRating: 0,
    created: new Date(),
    lastChanged: new Date()
  };

  const res = await createSubscriber(contact);
  return res.success ? 1 : 0;
};
