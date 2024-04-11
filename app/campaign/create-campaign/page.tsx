"use client";

import { Button } from "@/components/ui/button";
import { FaArrowRight, FaPlus } from "react-icons/fa";
import Link from "next/link";
import { Input } from "@/components/ui/input";

const NewCampaign = () => {
  return (
    <main className="w-5/6 flex flex-col py-6">
      <p className="text-5xl text-green-700 font-semibold mb-4">
        Create a new Campaign
      </p>
      <p className="text-xl text-gray-500 mb-12">
        Reach your customer's inboxes at the right time with Campaign Manager.
      </p>
      <p className="text-2xl font-semibold pb-2">Internet email name</p>
      <Input type="text" className="w-96 h-12 border border-green-700 mb-4" />
      <Button asChild variant="default" className="w-40 flex gap-x-2">
        <Link href="/campaign/create-email">
          <FaArrowRight />
          Create Email
        </Link>
      </Button>
    </main>
  );
};

export default NewCampaign;
