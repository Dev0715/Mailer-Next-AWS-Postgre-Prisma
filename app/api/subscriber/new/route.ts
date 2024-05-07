import { getSubscriberByEmail } from "@/data/audience/subscriber-by-email";
import { checkValidationOfEmail } from "@/data/email/check-validation";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (request: NextRequest) => {
  const data = await request.json();

  const { ownerEmail, firstName, lastName, subscriberEmail } = data;

  const emailValidation = await checkValidationOfEmail(subscriberEmail);
  if (!emailValidation) {
    return NextResponse.json({ error: "Email is invalid" });
  }

  const existingSubscriber = await getSubscriberByEmail(subscriberEmail);
  if (existingSubscriber) {
    return NextResponse.json({ existingSubscriber: true });
  }

  return NextResponse.json({ message: "Subscriber added" });
};
