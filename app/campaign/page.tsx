"use client";

import { Button } from "@/components/ui/button";
import { FaPlus } from "react-icons/fa";
import CampaignItem from "./_components/campaign-item";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";

const Blue = ({ children }: { children: React.ReactNode }) => {
  return <span className="text-blue-700">{children}</span>;
};

const Strong = ({ children }: { children: React.ReactNode }) => {
  return <span className="font-semibold">{children}</span>;
};

const CampaignPage = () => {
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
        <Separator />
        <CampaignItem />
        <Separator />
        <CampaignItem />
        <Separator />
        <CampaignItem />
      </div>
    </main>
  );
};

export default CampaignPage;
