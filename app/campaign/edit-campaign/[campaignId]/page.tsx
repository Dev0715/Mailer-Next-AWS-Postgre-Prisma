"use client";

import { getCampaignById } from "@/data/campaign/campaign-by-id";
import { useCurrentUser } from "@/hooks/use-current-user";
import { Campaign } from "@/shared/campaign-type";
import { notFound } from "next/navigation";
import { useEffect, useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from "@/components/ui/accordion";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { getAllSegmentsByEmail } from "@/data/segment/all-segments";
import { Segment } from "@/shared/segment-type";
import { FaCheck } from "react-icons/fa";

type Props = {
  params: { campaignId: string };
};

const EditCampaignPage = ({ params: { campaignId } }: Props) => {
  const user = useCurrentUser();

  const [loadError, setLoadError] = useState<boolean>(false);
  const [campaign, setCampaign] = useState<Campaign>();
  const [segments, setSegments] = useState<Segment[]>([]);

  useEffect(() => {
    getCampaignById(user?.email as string, campaignId).then((campaign) => {
      if (campaign) {
        setCampaign(campaign as Campaign);
      } else {
        setLoadError(true);
      }
    });

    getAllSegmentsByEmail(user?.email as string).then((segments) => {
      if (segments) {
        setSegments(segments as Segment[]);
      }
    });
  }, []);

  if (loadError) {
    return notFound();
  }

  return (
    <div className="w-5/6 flex flex-col gap-y-6 py-6">
      <p className="text-4xl text-green-700 font-semibold">
        Campaign {campaign?.title}
      </p>
      <Accordion type="single" collapsible>
        <AccordionItem value="item-1">
          <AccordionTrigger className="hover:no-underline hover:drop-shadow">
            <div className="flex items-start gap-x-4">
              <div
                className={`w-10 h-10 flex items-center justify-center rounded-full ${"bg-gray-600"}`}
              >
                <FaCheck className="text-white" />
              </div>
              <div className="flex flex-col items-start">
                <p className="text-xl">To</p>
                <p className="text-sm text-gray-500">
                  Who are you sending this email to?
                </p>
              </div>
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-1 pt-1">
            <div className="flex flex-col gap-y-2">
              <p className="text-base text-gray-600 font-medium">
                Select a segment
              </p>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Segment you want to send" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Your Segments</SelectLabel>
                    {segments.map((segment) => (
                      <SelectItem value={segment.segmentId}>
                        {segment.title}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default EditCampaignPage;
