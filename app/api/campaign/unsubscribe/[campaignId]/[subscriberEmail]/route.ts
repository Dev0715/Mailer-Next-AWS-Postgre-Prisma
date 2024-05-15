import { getCampaignById } from "@/data/campaign/campaign-by-id";
import { updateCampaignUnsub } from "@/data/campaign/campaign-update-unsub";
import { NextRequest, NextResponse } from "next/server";

type Params = {
  params: {
    campaignId: string;
    subscriberEmail: string;
  };
};

// ## http://localhost:3000/api/unsubscribe/campaign-id/user-email

export const POST = async (request: NextRequest, { params }: Params) => {
  const { campaignId, subscriberEmail } = params;
  const campaign = await getCampaignById(campaignId);
  if (campaign === null) {
    return NextResponse.json({ error: "Campaign not found" }, { status: 404 });
  }

  const _unsubscribedEmails = campaign.unsubscribedEmails || [];
  const isAlreadyUnSubed = _unsubscribedEmails.includes(subscriberEmail);
  if (isAlreadyUnSubed) {
    return NextResponse.json(
      { error: "Email was already regitered as unsubscribed" },
      { status: 404 }
    );
  }

  const unsubscribedEmails = [..._unsubscribedEmails, subscriberEmail];
  const unsubscribedCount = unsubscribedEmails.length;
  const res = await updateCampaignUnsub(
    campaignId,
    unsubscribedEmails,
    unsubscribedCount
  );

  if (res.success) {
    return NextResponse.json({ success: true });
  } else {
    return NextResponse.json(
      { error: "Failed to update campaign" },
      { status: 500 }
    );
  }
};
