import { getCampaignById } from "@/data/campaign/campaign-by-id";
import { updateCampaignUnsub } from "@/data/campaign/campaign-update-unsub";

type Params = {
  campaignId: string;
  subscriberEmail: string;
};

export const unsubscribe = async (params: Params) => {
  const { campaignId, subscriberEmail } = params;
  const campaign = await getCampaignById(campaignId);
  if (campaign === null) {
    return { error: "Campaign not found" };
  }

  const _unSubEmails = campaign.unsubEmails || [];
  const isAlreadyUnSub = _unSubEmails.includes(subscriberEmail);
  if (isAlreadyUnSub) {
    return {
      error: "You have already unsubscribed from this campaign"
    };
  }

  const unSubEmails = [..._unSubEmails, subscriberEmail];
  const unSubNumber = unSubEmails.length;
  const res = await updateCampaignUnsub(campaignId, unSubEmails, unSubNumber);

  if (res.success) {
    return { success: true };
  } else {
    return { error: "Failed to update campaign" };
  }
};
