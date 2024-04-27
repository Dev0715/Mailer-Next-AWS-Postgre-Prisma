"use server";

import { getSegmentById } from "@/data/segment/segment-by-id";
import { Campaign } from "../types/campaign";
import { Segment } from "../types/segment";
import { Subscriber } from "../types/subscriber";
import { getConditionFromFilters } from "./condition-from-filters";
import { getAllSubscribersByCondition } from "@/data/audience/subscribers-by-condition";

export const runCampaign = async (campaign: Campaign) => {
  const segmentId: string = campaign.to?.segmentId as string;

  const segment: Segment = (await getSegmentById(
    campaign.userEmail,
    segmentId
  )) as Segment;

  if (!segment) return;

  const condition = getConditionFromFilters(segment.filters);
  const customers: Subscriber[] | null =
    await getAllSubscribersByCondition(condition);

  if (!customers) return;

  customers.map((customer: Subscriber) => {});
};
