"use client";

import { getCampaignById } from "@/data/campaign/campaign-by-id";
import { useCurrentUser } from "@/hooks/use-current-user";
import { notFound } from "next/navigation";
import { useEffect, useState } from "react";

type Props = {
  params: { campaignId: string };
};

const EditCampaignPage = ({ params: { campaignId } }: Props) => {
  const user = useCurrentUser();

  const [loadError, setLoadError] = useState<boolean>(false);
  const [campaign, setCampaign] = useState<any>();

  useEffect(() => {
    getCampaignById(user?.email as string, campaignId).then((campaign) => {
      if (campaign) {
        setCampaign(campaign);
      } else {
        setLoadError(true);
      }
    });
  }, []);

  if (loadError) {
    return notFound();
  }

  return (
    <div className="w-5/6 flex flex-col py-6">
      <h1>Edit Campaign: {campaign.title}</h1>
    </div>
  );
};

export default EditCampaignPage;
