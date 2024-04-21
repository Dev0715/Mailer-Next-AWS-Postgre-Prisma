"use client";

import { Button } from "@/components/ui/button";
import { FaArrowRight } from "react-icons/fa";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { useState, useTransition } from "react";

const NewCampaignSchema = z.object({
  title: z
    .string()
    .min(6, "Email Title should be at least 6 characters long")
    .max(72, "Email Title should be a maximum of 72 characters");
});

const NewCampaign = () => {
  const [error, setError] = useState<string | undefined>("");
  const [isPending, startTransition] =useTransition();

  const onNewCampaign = () => {};

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
      <Button
        asChild
        variant="default"
        className="w-40 flex gap-x-2"
        onClick={onNewCampaign}
      >
        <FaArrowRight />
        Create Email
      </Button>
    </main>
  );
};

export default NewCampaign;
