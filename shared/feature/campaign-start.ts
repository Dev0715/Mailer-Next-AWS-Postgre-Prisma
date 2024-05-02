"use server";

import { getSegmentById } from "@/data/segment/segment-by-id";
import { Campaign } from "../types/campaign";
import { Segment } from "../types/segment";
import { Subscriber } from "../types/subscriber";
import { getConditionFromFilters } from "./condition-from-filters";
import { getAllSubscriberEmailsByCondition } from "@/data/audience/subscribers-email-by-condition";

export const runCampaign = async (campaign: Campaign) => {
  const segmentId: string = campaign.to?.segmentId as string;

  const segment: Segment = (await getSegmentById(
    campaign.userEmail,
    segmentId
  )) as Segment;

  if (!segment) return;

  const condition = getConditionFromFilters(segment.filters);
  const response = await getAllSubscriberEmailsByCondition(condition);

  if (!response) return;

  const customers: Subscriber[] = response.map(
    (subscriber) => subscriber as Subscriber
  );

  customers.map((customer: Subscriber) => {});
};
