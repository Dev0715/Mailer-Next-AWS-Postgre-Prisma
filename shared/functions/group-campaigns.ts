import { Campaign } from "../types/campaign";

export const groupCampaigns = (campaigns: Campaign[]) => {
  const groupedCampaigns: Record<string, Campaign[]> = {};
  campaigns.map((campaign: Campaign) => {
    const month = campaign.lastUpdated.toLocaleString("default", {
      month: "long"
    });
    const year = campaign.lastUpdated.getFullYear();
    const monthYear = `${month}, ${year}`;

    if (!groupedCampaigns[monthYear]) {
      groupedCampaigns[monthYear] = [];
    }
    groupedCampaigns[monthYear].push(campaign);
  });
  return groupedCampaigns;
};
