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

  const _unsubEmails = campaign.unsubEmails || [];
  const isAlreadyUnsubed = _unsubEmails.includes(subscriberEmail);
  if (isAlreadyUnsubed) {
    return {
      error: "You have already unsubscribed from this campaign"
    };
  }

  const unsubEmails = [..._unsubEmails, subscriberEmail];
  const res = await updateCampaignUnsub(campaignId, unsubEmails);

  if (res.success) {
    return { success: true };
  } else {
    return { error: "Failed to update campaign" };
  }
};
