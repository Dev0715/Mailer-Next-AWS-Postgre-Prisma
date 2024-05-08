import { sendOtpUnsubEmail } from "@/actions/mail/send-otp-unsub";
import { getSubscriberByEmail } from "@/data/audience/subscriber-by-email";
import { updateSubscriber } from "@/data/audience/subscriber-update";
import { generateOtp } from "@/shared/functions/generate-otp";
import { NextRequest, NextResponse } from "next/server";

// ## Unsubscribe Email: Send UNSUB OTP to [subscriberEmail]

export const POST = async (request: NextRequest) => {
  const data = await request.json();
  const { ownerEmail, subscriberEmail } = data;

  const existingSubscriber = await getSubscriberByEmail({
    userEmail: ownerEmail,
    subscriberEmail
  });

  if (!existingSubscriber) {
    return NextResponse.json({}, { status: 404 });
  }

  const otp = generateOtp();
  const response = await updateSubscriber({
    id: existingSubscriber.id as string,
    otp
  });

  if (response.error) {
    return NextResponse.json({}, { status: 404 });
  }

  await sendOtpUnsubEmail(subscriberEmail, otp);
  return NextResponse.json({ success: true });
};
