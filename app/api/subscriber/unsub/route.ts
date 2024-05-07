import { getSubscriberByEmail } from "@/data/audience/subscriber-by-email";
import { deleteSubscriber } from "@/data/audience/subscriber-delete";
import { Subscriber } from "@/shared/types/subscriber";
import { NextRequest, NextResponse } from "next/server";

// ## Unsubscribe Email: Remove [subscriberEmail] from database

export const POST = async (request: NextRequest) => {
  const data = await request.json();
  const { ownerEmail, subscriberEmail, opt } = data;

  const existingSubscriber: Subscriber = (await getSubscriberByEmail({
    userEmail: ownerEmail,
    subscriberEmail
  })) as Subscriber;

  if (!existingSubscriber.otp) {
    return NextResponse.json({}, { status: 404 });
  }

  if (existingSubscriber.otp !== opt) {
    return NextResponse.json({ incorrect: true });
  }

  const response = await deleteSubscriber(existingSubscriber.id as string);

  if (response.error) {
    return NextResponse.json({}, { status: 404 });
  } else {
    return NextResponse.json({ success: true });
  }
};
