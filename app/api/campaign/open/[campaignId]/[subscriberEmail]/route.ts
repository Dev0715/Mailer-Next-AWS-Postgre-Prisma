import { getCampaignById } from "@/data/campaign/campaign-by-id";
import { updateCampaignOpened } from "@/data/campaign/campaign-update-opened";
import { NextRequest, NextResponse } from "next/server";

type Params = {
  params: {
    campaignId: string;
    subscriberEmail: string;
  };
};

// ## http://localhost:3000/api/open/campaign-id/user-email

export const GET = async (request: NextRequest, { params }: Params) => {
  const { campaignId, subscriberEmail } = params;
  const campaign = await getCampaignById(campaignId);
  if (campaign === null) {
    return NextResponse.json({ error: "Campaign not found" }, { status: 404 });
  }

  const _openedEmails = campaign.openedEmails || [];
  const isAlreadyOpened = _openedEmails.includes(subscriberEmail);
  if (isAlreadyOpened) {
    return NextResponse.json(
      { error: "Email was already registered as opened" },
      { status: 404 }
    );
  }

  const openedEmails = [..._openedEmails, subscriberEmail];
  const openedCount = openedEmails.length;
  const res = await updateCampaignOpened(campaignId, openedEmails, openedCount);

  if (res.success) {
    return NextResponse.json({ success: true });
  } else {
    return NextResponse.json(
      { error: "Failed to update campaign" },
      { status: 500 }
    );
  }
};
