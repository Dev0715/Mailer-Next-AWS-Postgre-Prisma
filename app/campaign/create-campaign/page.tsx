"use client";

import { Button } from "@/components/ui/button";
import { FaPlus } from "react-icons/fa";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";

const Blue = ({ children }: { children: React.ReactNode }) => {
  return <span className="text-blue-700">{children}</span>;
};

const Strong = ({ children }: { children: React.ReactNode }) => {
  return <span className="font-semibold">{children}</span>;
};

const NewCampaign = () => {
  return (
    <main className="w-5/6 flex flex-col py-6">
      <p className="text-5xl text-green-700 font-semibold pb-6">
        Create a new Campaign
      </p>
      <p className="text-2xl font-semibold pb-2">Hi, Malachi Uy!</p>
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
    </main>
  );
};

export default NewCampaign;
