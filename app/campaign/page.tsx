"use client";

import { Button } from "@/components/ui/button";
import { FaPlus } from "react-icons/fa";
import { Separator } from "@/components/ui/separator";
import { useEffect, useState } from "react";
import { getAllCampaignsByEmail } from "@/data/campaign/campaigns-all";
import { useCurrentUser } from "@/hooks/use-current-user";
import { Campaign } from "@/shared/types/campaign";
import CampaignItem from "../../components/campaign/campaign-item";
import Link from "next/link";
import { groupCampaigns } from "@/shared/functions/group-campaigns";

const CampaignPage = () => {
  const user = useCurrentUser();
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [groupedCampaigns, setGroupedCampaigns] = useState<
    Record<string, Campaign[]>
  >({});

  useEffect(() => {
    getAllCampaignsByEmail(user?.email as string).then((items) => {
      if (items) {
        const _items = items.map((_item) => {
          const item = _item as unknown as Campaign;
          if (item?.time?.date) {
            item.time.date = new Date(item.time.date);
          }
          return item;
        }) as Campaign[];

        setCampaigns(_items);
        setGroupedCampaigns(groupCampaigns(_items));
      }
    });
  });

  const onRemove = (campaignId: string) => {
    // # Need to Stop Trigger? #
    // setCampaigns((prevCampaigns) =>
    //   prevCampaigns.filter((campaign) => campaign.campaignId !== campaignId)
    // );
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
        <p className="text-lg text-gray-500">April, 2024 (2)</p>
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
