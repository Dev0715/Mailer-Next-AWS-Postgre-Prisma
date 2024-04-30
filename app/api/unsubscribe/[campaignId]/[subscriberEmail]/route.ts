import { getCampaignById } from "@/data/campaign/campaign-by-id";
import { NextRequest, NextResponse } from "next/server";
import { updateCampaignUnsub } from "../../../../../data/campaign/campaign-update-unsub";

type Params = {
  campaignId: string;
  subscriberEmail: string;
};

export const POST = async (request: NextRequest, params: Params) => {
  console.log(params);
  const { campaignId, subscriberEmail } = params;
  const campaign = await getCampaignById(campaignId);
  if (campaign === null) {
    return NextResponse.json({ error: "Campaign not found" }, { status: 404 });
  }
  const _unsubEmails = campaign.unsubEmails || [];
  const isAlreadyUnsubed = _unsubEmails.includes(subscriberEmail);
  if (isAlreadyUnsubed) {
    return NextResponse.json(
      { error: "Email was already regitered as unsubscribed" },
      { status: 404 }
    );
  }

  const unsubEmails = [..._unsubEmails, subscriberEmail];
  const res = await updateCampaignUnsub(campaignId, unsubEmails);

  if (res?.success) {
    return NextResponse.json({ success: true });
  } else {
    return NextResponse.json(
      { error: "Failed to update campaign" },
      { status: 500 }
    );
  }
};
