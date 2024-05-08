import { sendOtpUnsubEmail } from "@/actions/mail/send-otp-unsub";
import { getSubscriberByEmail } from "@/data/audience/subscriber-by-email";
import { updateSubscriber } from "@/data/audience/subscriber-update";
import { generateOtp } from "@/shared/functions/generate-otp";
import { NextRequest, NextResponse } from "next/server";

type Params = {
  params: {
    userEmail: string;
    subscriberEmail: string;
  };
};

// ## Unsubscribe Email: Send UNSUB OTP to [subscriberEmail]

export const POST = async (request: NextRequest, { params }: Params) => {
  const { userEmail, subscriberEmail } = params;

  const existingSubscriber = await getSubscriberByEmail({
    userEmail,
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
