import { updateCampaignState } from "@/data/campaign/campaign-update-state";
import { NextRequest, NextResponse } from "next/server";

type Params = {
  params: {
    campaignId: string;
  };
};

export const POST = async (request: NextRequest, { params }: Params) => {
  const { campaignId } = params;

  await updateCampaignState(campaignId, "sent");

  return NextResponse.json({ error: "Campaign not found" });
};
