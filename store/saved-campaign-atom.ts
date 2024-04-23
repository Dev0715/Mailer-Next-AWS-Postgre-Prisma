import { Campaign } from "@/shared/campaign-type";
import { atom } from "jotai";

type SavedCampaign = {
  isSaved: boolean;
  campaign: Campaign;
};

export const savedCampaignAtom = atom<SavedCampaign>({
  isSaved: false,
  campaign: {
    userEmail: "",
    campaignId: "",
    title: ""
  }
});
