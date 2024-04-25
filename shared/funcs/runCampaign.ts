"use server";

import { getSegmentById } from "@/data/segment/segment-by-id";
import { Campaign } from "../campaign-type";
import { Segment } from "../segment-type";
import { getAllCustomersByEmail } from "@/data/audience/all-customers";
import { Customer } from "../customer-type";
import { isFiltered } from "@/lib/segment";
import { transporter } from "@/lib/nodemailer";

export const runCampaign = async (campaign: Campaign) => {
  const segmentId: string = campaign.to as string;
  const segment: Segment = (await getSegmentById(
    campaign.userEmail,
    segmentId
  )) as Segment;

  if (!segment) return;

  const customers = (await getAllCustomersByEmail(
    campaign.userEmail
  )) as Customer[];

  if (!customers) return;

  customers.map((customer: Customer) => {
    if (isFiltered(customer, segment.filters)) {
      transporter.sendMail({
        from: campaign.from?.email,
        to: customer.subscriberEmail,
        subject: campaign.subject?.subject,
        html: campaign.email?.html
      });
    }
  });
};
