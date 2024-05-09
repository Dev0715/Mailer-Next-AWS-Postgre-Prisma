import { getSubscriberByEmail } from "@/data/audience/subscriber-by-email";
import { deleteSubscriber } from "@/data/audience/subscriber-delete";
import { Subscriber } from "@/shared/types/subscriber";
import { NextRequest, NextResponse } from "next/server";

// ## Unsubscribe Email: Remove [subscriberEmail] from database

export const POST = async (request: NextRequest) => {
  const data = await request.json();
  const { ownerEmail, subscriberEmail, otp } = data;

  const existingSubscriber: Subscriber = (await getSubscriberByEmail({
    userEmail: ownerEmail,
    subscriberEmail
  })) as Subscriber;

  if (!existingSubscriber.otp) {
    return NextResponse.json({}, { status: 404 });
  }

  if (existingSubscriber.otp !== (otp as string)) {
    return NextResponse.json({ error: "OTP is invalid" });
  }

  const response_remove = await deleteSubscriber(
    existingSubscriber.id as string
  );

  if (response_remove.error) {
    return NextResponse.json({}, { status: 404 });
  } else {
    return NextResponse.json({ removed: true });
  }
};
