import { getCampaignById } from "@/data/campaign/campaign-by-id";
import { NextRequest } from "next/server";

type Params = {
  campaignId: string;
  subscriberEmail: string;
};

// ## http://localhost:3000/api/open/id/mail
export const POST = async (request: NextRequest, params: Params) => {
  const { campaignId, subscriberEmail } = params;
  const campaign = await getCampaignById(campaignId);
};
