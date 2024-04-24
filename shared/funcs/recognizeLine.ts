import { createSubscriber } from "@/data/audience/create-subscriber";
import { Customer } from "../customer-type";

type FunctionType = (
  userEmail: string,
  str: string,
  splitter: string
) => Promise<number>;

export const recognizeLine: FunctionType = async (userEmail, str, splitter) => {
  const fields = str.split(splitter);
  if (fields.length < 6) {
    return 0;
  }

  const contact: Customer = {
    userEmail,
    subscriberEmail: fields[0].trim(),
    firstName: fields[1].trim(),
    lastName: fields[2].trim(),
    address: fields[3],
    phoneNumber: fields[4],
    birthday: new Date(fields[5])?.toISOString() || "",
    tags: [],
    subscribed: true,
    created: new Date().toISOString(),
    lastChanged: new Date().toISOString()
  };

  const res = await createSubscriber(contact);
  return res.success ? 1 : 0;
};
