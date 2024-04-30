import { getCampaignById } from "@/data/campaign/campaign-by-id";
import { updateCampaignOpened } from "@/data/campaign/campaign-update-opened";
import { NextRequest, NextResponse } from "next/server";

type Params = {
  campaignId: string;
  subscriberEmail: string;
};

// ## http://localhost:3000/api/open/id/mail
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

  const _openedEmails = campaign.openedEmails || [];
  const openedEmails = [..._openedEmails, subscriberEmail];
  await updateCampaignOpened(campaignId, openedEmails);

  return NextResponse.json({ success: true });
};
