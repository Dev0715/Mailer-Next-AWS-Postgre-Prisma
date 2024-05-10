import { Campaign } from "../types/campaign";

const groupCampaigns = (campaigns: Campaign[]) => {
  const groupedCampaigns: Record<string, Campaign[]> = {};
  campaigns.map((campaign: Campaign) => {
    const month = campaign.lastUpdated.toLocaleString("default", {
      month: "long"
    });
    if (!groupedCampaigns[month]) {
      groupedCampaigns[month] = [];
    }
    groupedCampaigns[month].push(campaign);
  });
  return groupCampaigns;
};
