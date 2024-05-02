"use client";

import { Button } from "@/components/ui/button";
import { FaPlus } from "react-icons/fa";
import CampaignItem from "../../components/campaign/campaign-item";
import { Separator } from "@/components/ui/separator";
import { useEffect, useState } from "react";
import { getAllCampaignsByEmail } from "@/data/campaign/campaigns-all";
import { useCurrentUser } from "@/hooks/use-current-user";
import { Campaign } from "@/shared/types/campaign";
import Link from "next/link";

const Blue = ({ children }: { children: React.ReactNode }) => {
  return <span className="text-blue-700">{children}</span>;
};

const Strong = ({ children }: { children: React.ReactNode }) => {
  return <span className="font-semibold">{children}</span>;
};

const CampaignPage = () => {
  const user = useCurrentUser();
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);

  useEffect(() => {
    getAllCampaignsByEmail(user?.email as string).then((items) => {
      if (items) {
        setCampaigns(items.map((item) => item as unknown as Campaign));
      }
    });
  });

  const onRemove = (campaignId: string) => {
    // # Need to Stop Trigger? #
    setCampaigns((prevCampaigns) =>
      prevCampaigns.filter((campaign) => campaign.campaignId !== campaignId)
    );
  };

  return (
    <main className="w-5/6 flex flex-col py-6">
      <p className="text-2xl text-green-700 font-semibold pb-6">
        Campaign Dashboard
      </p>
      <div className="flex items-end justify-between pb-6">
        <p className="text-xl font-semibold pb-2">Hi, {user?.name}!</p>
        <Button asChild variant="default" className="flex gap-x-2">
          <Link href="/campaign/create-campaign">
            <FaPlus />
            Create New
          </Link>
        </Button>
      </div>
      <div className="flex flex-col gap-y-4">
        <p className="text-xl text-gray-500">April, 2024 (2)</p>
        {campaigns.map((campaign) => (
          <div key={campaign.campaignId} className="flex flex-col gap-y-4">
            <Separator />
            <CampaignItem
              campaign={campaign}
              onRemove={() => onRemove(campaign.campaignId)}
            />
          </div>
        ))}
      </div>
    </main>
  );
};

export default CampaignPage;
