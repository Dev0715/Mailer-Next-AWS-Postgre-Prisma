import { sendOtpValidationEmail } from "@/actions/mail/send-otp-validate";
import { getSubscriberByEmail } from "@/data/audience/subscriber-by-email";
import { createSubscriber } from "@/data/audience/subscriber-create";
import { updateSubscriber } from "@/data/audience/subscriber-update";
import { checkValidationOfEmail } from "@/data/email/check-validation";
import { generateOtp } from "@/shared/functions/generate-otp";
import { Subscriber } from "@/shared/types/subscriber";
import { NextRequest, NextResponse } from "next/server";

// ## First STEP: Check validity and do initial operations
// ## Return STATUS of [subscriberEmail]

export const POST = async (request: NextRequest) => {
  const data = await request.json();
  const { ownerEmail, subscriberEmail, firstName, lastName } = data;

  const emailValidation = await checkValidationOfEmail(subscriberEmail);
  if (!emailValidation) {
    return NextResponse.json({ error: "Email is invalid" });
  }

  const existingSubscriber: Subscriber = (await getSubscriberByEmail({
    userEmail: ownerEmail,
    subscriberEmail
  })) as Subscriber;

  if (existingSubscriber) {
    if (existingSubscriber.validated) {
      return NextResponse.json({ existing: true });
    } else {
      const otp = generateOtp();
      const res_update = await updateSubscriber({
        id: existingSubscriber.id as string,
        firstName,
        lastName,
        otp
      });

      if (res_update.error) {
        return NextResponse.json({}, { status: 404 });
      }

      sendOtpValidationEmail(subscriberEmail, otp);
      return NextResponse.json({ unvalidated: true });
    }
  } else {
    const otp = generateOtp();
    const res_create = await createSubscriber({
      userEmail: ownerEmail,
      subscriberEmail,
      firstName,
      lastName,
      validated: false,
      otp
    });

    if (res_create.error) {
      return NextResponse.json({}, { status: 404 });
    }

    sendOtpValidationEmail(subscriberEmail, otp);
    return NextResponse.json({ created: true });
  }
};
