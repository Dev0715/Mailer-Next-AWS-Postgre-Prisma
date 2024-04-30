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
export const POST = async (request: NextRequest, { params }: Params) => {
  console.log(params);
  const { campaignId, subscriberEmail } = params;
  const campaign = await getCampaignById(campaignId);
  if (campaign === null) {
    return NextResponse.json({ error: "Campaign not found" }, { status: 404 });
  }

  const _openedEmails = campaign.openedEmails || [];
  const isAlreadyOpened = _openedEmails.includes(subscriberEmail);
  if (isAlreadyOpened) {
    return NextResponse.json(
      { error: "Email was already regitered as opened" },
      { status: 404 }
    );
  }

  const openedEmails = [..._openedEmails, subscriberEmail];
  const res = await updateCampaignOpened(campaignId, openedEmails);

  if (res?.success) {
    return NextResponse.json({ success: true });
  } else {
    return NextResponse.json(
      { error: "Failed to update campaign" },
      { status: 500 }
    );
  }
};
