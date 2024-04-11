"use client";

import { Button } from "@/components/ui/button";
import { FaPlus } from "react-icons/fa";
import CampaignItem from "./_components/campaign-item";

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
        <Button variant="default" className="flex gap-x-2">
          <FaPlus />
          Create New
        </Button>
      </div>
      <div className="flex flex-col">
        <CampaignItem />
      </div>
    </main>
  );
};

export default CampaignPage;
