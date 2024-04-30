import { getCampaignById } from "@/data/campaign/campaign-by-id";
import { NextRequest, NextResponse } from "next/server";

type Params = {
  campaignId: string;
  subscriberEmail: string;
};

export const POST = async (
  request: NextRequest,
  response: NextResponse,
  params: Params
) => {
  console.log(params);
  const { campaignId, subscriberEmail } = params;
  const campaign = await getCampaignById(campaignId);
  if (campaign === null) {
    return NextResponse.json({ error: "Campaign not found" }, { status: 404 });
  }
  const _unsubEmails = campaign.unsubEmails || [];
  const isAlreadyUnsubed = _unsubEmails.includes(subscriberEmail);
  return NextResponse.json({ success: true });
};
