"use client";

import { Button } from "@/components/ui/button";
import { FaPlus } from "react-icons/fa";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { Input } from "@/components/ui/input";

const NewCampaign = () => {
  return (
    <main className="w-5/6 flex flex-col py-6">
      <p className="text-5xl text-green-700 font-semibold pb-4">
        Create a new Campaign
      </p>
      <p className="text-xl text-gray-500 pb-12">
        Reach your customer's inboxes at the right time with Campaign Manager.
      </p>
      <p className="text-2xl font-semibold pb-2">Internet email name</p>
      <Input type="text" className="w-96 h-12 border border-green-700" />
    </main>
  );
};

export default NewCampaign;
