"use client";

import { Button } from "@/components/ui/button";
import { FaPlus } from "react-icons/fa";
import CampaignItem from "./_components/campaign-item";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { useEffect, useState } from "react";
import { getAllCampaignsByEmail } from "@/data/campaign/all-campaigns";
import { useCurrentUser } from "@/hooks/use-current-user";
import { Campaign } from "@/shared/campaign-type";

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
        setCampaigns(items as Campaign[]);
      }
    });
  });

  return (
    <main className="w-5/6 flex flex-col py-6">
      <p className="text-5xl text-green-700 font-semibold pb-6">
        Campaign Dashboard
      </p>
      <p className="text-2xl font-semibold pb-2">Hi, Malachi Uy!</p>
      <div className="flex items-end justify-between pb-6">
        <p className="text-xl">
          Your audience has{" "}
          <Blue>
            <Strong>17</Strong>{" "}
          </Blue>{" "}
          contacts.{" "}
          <Blue>
            <Strong>15</Strong>
          </Blue>{" "}
          of these are subscribed.
        </p>
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
          <div className="flex flex-col gap-y-4">
            <Separator />
            <CampaignItem />
          </div>
        ))}
      </div>
    </main>
  );
};

export default CampaignPage;
