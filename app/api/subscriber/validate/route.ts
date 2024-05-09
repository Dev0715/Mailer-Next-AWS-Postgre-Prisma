import { getSubscriberByEmail } from "@/data/audience/subscriber-by-email";
import { updateSubscriber } from "@/data/audience/subscriber-update";
import { Subscriber } from "@/shared/types/subscriber";
import { NextRequest, NextResponse } from "next/server";

// ## Validate [subscriberEmail]

export const POST = async (request: NextRequest) => {
  const data = await request.json();
  const { ownerEmail, subscriberEmail, otp } = data;

  const existingSubscriber: Subscriber = (await getSubscriberByEmail({
    userEmail: ownerEmail,
    subscriberEmail
  })) as Subscriber;

  if (!existingSubscriber) {
    return NextResponse.json({}, { status: 404 });
  }

  if (existingSubscriber.otp !== (otp as string)) {
    return NextResponse.json({ error: "OTP is invalid" });
  }

  const res_update = await updateSubscriber({
    id: existingSubscriber.id as string,
    validated: true
  });

  if (res_update.error) {
    return NextResponse.json({}, { status: 404 });
  }

  return NextResponse.json({ validated: true });
};
