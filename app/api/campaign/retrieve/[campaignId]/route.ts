import { getAllSubscriberEmailsByCondition } from "@/data/audience/subscribers-email-by-condition";
import { getCampaignById } from "@/data/campaign/campaign-by-id";
import { getSegmentById } from "@/data/segment/segment-by-id";
import { getConditionFromFilters } from "@/shared/functions/condition-from-filters";
import { Campaign } from "@/shared/types/campaign";
import { Segment } from "@/shared/types/segment";
import { NextRequest, NextResponse } from "next/server";

type Params = {
  params: {
    campaignId: string;
  };
};

export const GET = async (request: NextRequest, { params }: Params) => {
  const { campaignId } = params;

  const campaign: Campaign = (await getCampaignById(
    campaignId
  )) as unknown as Campaign;
  if (campaign === null) {
    return NextResponse.json({ error: "Campaign not found" }, { status: 404 });
  }

  const segmentId = campaign.to?.segmentId as string;
  const segment: Segment = (await getSegmentById(
    campaign.userEmail,
    segmentId
  )) as Segment;

  if (!segment) {
    return NextResponse.json({ error: "Segment not found" }, { status: 404 });
  }

  const condition = getConditionFromFilters(segment.filters);
  const response = await getAllSubscriberEmailsByCondition(condition);

  if (!response) {
    return NextResponse.json(
      { error: "Failed to get subscribers" },
      { status: 500 }
    );
  }

  const customers: string[] = response.map(
    (subscriber) => subscriber.subscriberEmail as string
  );

  return NextResponse.json({
    from: campaign.from?.email,
    customers,
    subject:
      campaign.subject?.subject +
      (campaign.subject?.preview ? " " + campaign.subject.preview : ""),
    html: campaign.email?.html
  });
};
