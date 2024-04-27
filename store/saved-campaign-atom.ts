import { Campaign } from "@/shared/types/campaign";
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
