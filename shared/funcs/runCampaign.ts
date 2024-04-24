"use server";

import { getSegmentById } from "@/data/segment/segment-by-id";
import { Campaign } from "../campaign-type";
import { Segment } from "../segment-type";

export const runCampaign = async (campaign: Campaign) => {
  const segmentId: string = campaign.to as string;
  const segment: Segment = (await getSegmentById(
    campaign.userEmail,
    segmentId
  )) as Segment;

  if (!segment) return;
};
