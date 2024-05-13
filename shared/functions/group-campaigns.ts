import { Campaign } from "../types/campaign";
import { getMonthYearStr } from "./get-month-year-str";

export const groupCampaigns = (campaigns: Campaign[]) => {
  const groupedCampaigns: Record<string, Campaign[]> = {};
  campaigns.map((campaign: Campaign) => {
    const monthYear = getMonthYearStr(campaign.lastUpdated);

    if (!groupedCampaigns[monthYear]) {
      groupedCampaigns[monthYear] = [];
    }
    groupedCampaigns[monthYear].push(campaign);
  });
  return groupedCampaigns;
};
